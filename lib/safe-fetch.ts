import { isIP } from "node:net";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;
const DEFAULT_MAX_REDIRECTS = 2;

const HARD_MAX_TIMEOUT_MS = 30_000;
const HARD_MAX_BYTES = 10 * 1024 * 1024;
const HARD_MAX_REDIRECTS = 5;

export class FetchJsonError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "FetchJsonError";
    if (options?.status !== undefined) this.status = options.status;
    if (options?.url !== undefined) this.url = options.url;
    if (options?.retryAfterMs !== undefined) this.retryAfterMs = options.retryAfterMs;
  }
}

function boundedInteger(value, fallback, maximum, label) {
  const resolved = value ?? fallback;
  if (!Number.isSafeInteger(resolved) || resolved < 0 || resolved > maximum) {
    throw new FetchJsonError(`${label} must be an integer between 0 and ${maximum}`);
  }
  return resolved;
}

function ipv4IsLocal(address) {
  const octets = address.split(".").map(Number);
  return (
    octets[0] === 0 ||
    octets[0] === 10 ||
    octets[0] === 127 ||
    (octets[0] === 169 && octets[1] === 254) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168)
  );
}

function ipv6Words(address) {
  const halves = address.toLowerCase().split("::");
  if (halves.length > 2) return undefined;

  function words(part) {
    if (!part) return [];
    const pieces = part.split(":");
    const last = pieces.at(-1);
    if (last?.includes(".")) {
      if (isIP(last) !== 4) return undefined;
      const octets = last.split(".").map(Number);
      pieces.splice(-1, 1, ((octets[0] << 8) | octets[1]).toString(16), ((octets[2] << 8) | octets[3]).toString(16));
    }
    const parsed = pieces.map((piece) => (/^[0-9a-f]{1,4}$/i.test(piece) ? Number.parseInt(piece, 16) : NaN));
    return parsed.every(Number.isFinite) ? parsed : undefined;
  }

  const left = words(halves[0]);
  const right = words(halves[1] ?? "");
  if (!left || !right) return undefined;
  if (halves.length === 1) return left.length === 8 ? left : undefined;
  const omitted = 8 - left.length - right.length;
  if (omitted < 1) return undefined;
  return [...left, ...Array(omitted).fill(0), ...right];
}

function ipv6IsLocal(address) {
  const words = ipv6Words(address);
  if (!words) return true;
  const allButLastAreZero = words.slice(0, 7).every((word) => word === 0);
  if (words.every((word) => word === 0) || (allButLastAreZero && words[7] === 1)) return true;
  if ((words[0] & 0xfe00) === 0xfc00 || (words[0] & 0xffc0) === 0xfe80) return true;

  // Apply the IPv4 rules to mapped/compatible literals as well. URL parsing
  // normally canonicalizes dotted tails, so inspect the final two words.
  const mapped = words.slice(0, 5).every((word) => word === 0) && words[5] === 0xffff;
  const compatible = words.slice(0, 6).every((word) => word === 0);
  if (mapped || compatible) {
    const ipv4 = `${words[6] >> 8}.${words[6] & 0xff}.${words[7] >> 8}.${words[7] & 0xff}`;
    return ipv4IsLocal(ipv4);
  }
  return false;
}

function hostnameIsLocal(hostname) {
  let normalized = hostname.toLowerCase();
  if (normalized.startsWith("[") && normalized.endsWith("]")) normalized = normalized.slice(1, -1);
  normalized = normalized.replace(/\.+$/, "");
  if (normalized === "localhost" || normalized.endsWith(".localhost")) return true;
  if (normalized.includes("%")) return true;

  const version = isIP(normalized);
  if (version === 4) return ipv4IsLocal(normalized);
  if (version === 6) return ipv6IsLocal(normalized);
  return false;
}

function checkedUrl(input, { allowHttp }) {
  let url;
  try {
    url = new URL(input);
  } catch {
    throw new FetchJsonError(`invalid URL: ${String(input)}`);
  }

  if (url.username || url.password) {
    throw new FetchJsonError(`URL credentials are not allowed: ${url.origin}`);
  }
  if (url.protocol !== "https:" && !(allowHttp && url.protocol === "http:")) {
    throw new FetchJsonError(`only HTTPS URLs are allowed: ${url.href}`);
  }
  if (hostnameIsLocal(url.hostname)) {
    throw new FetchJsonError(`local and private network targets are not allowed: ${url.hostname}`);
  }
  return url;
}

function checkedHeaders(input) {
  if (input === undefined) return {};
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new FetchJsonError("headers must be an object of string values");
  }

  const output = {};
  for (const [name, value] of Object.entries(input)) {
    if (typeof value !== "string") {
      throw new FetchJsonError(`header ${name} must be a string`);
    }
    output[name] = value;
  }
  return output;
}

async function readBoundedBody(response, maxBytes) {
  const declaredLength = response.headers.get("content-length");
  if (declaredLength !== null) {
    const parsedLength = Number(declaredLength);
    if (Number.isFinite(parsedLength) && parsedLength > maxBytes) {
      throw new FetchJsonError(`response is larger than the ${maxBytes}-byte limit`);
    }
  }

  if (!response.body) return "";

  const chunks = [];
  let total = 0;
  const reader = response.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel("response size limit exceeded");
        throw new FetchJsonError(`response is larger than the ${maxBytes}-byte limit`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

function retryAfterMilliseconds(response) {
  const value = response.headers.get("retry-after");
  if (value === null) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.ceil(seconds * 1_000);
  const date = Date.parse(value);
  return Number.isFinite(date) ? Math.max(0, date - Date.now()) : undefined;
}

function createBoundedTextFetcher({
  fetchImpl = globalThis.fetch,
  allowHttp = false,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  maxBytes = DEFAULT_MAX_BYTES,
  maxRedirects = DEFAULT_MAX_REDIRECTS,
  userAgent = "digirare-collection-adapter/1.0",
} = {}, {
  helperName,
  accept,
  contentTypeMatches,
  expectedContent,
}) {
  if (typeof fetchImpl !== "function") throw new FetchJsonError("a fetch implementation is required");

  const defaults = {
    timeoutMs: boundedInteger(timeoutMs, DEFAULT_TIMEOUT_MS, HARD_MAX_TIMEOUT_MS, "timeoutMs"),
    maxBytes: boundedInteger(maxBytes, DEFAULT_MAX_BYTES, HARD_MAX_BYTES, "maxBytes"),
    maxRedirects: boundedInteger(maxRedirects, DEFAULT_MAX_REDIRECTS, HARD_MAX_REDIRECTS, "maxRedirects"),
  };

  return async function boundedFetch(input, options = {}) {
    if (typeof options !== "object" || options === null || Array.isArray(options)) {
      throw new FetchJsonError(`${helperName} options must be an object`);
    }
    const allowedOptions = new Set(["headers", "timeoutMs", "maxBytes", "maxRedirects"]);
    for (const key of Object.keys(options)) {
      if (!allowedOptions.has(key)) throw new FetchJsonError(`unknown ${helperName} option: ${key}`);
    }

    const requestTimeoutMs = boundedInteger(
      options.timeoutMs,
      defaults.timeoutMs,
      HARD_MAX_TIMEOUT_MS,
      "timeoutMs",
    );
    const requestMaxBytes = boundedInteger(options.maxBytes, defaults.maxBytes, HARD_MAX_BYTES, "maxBytes");
    const requestMaxRedirects = boundedInteger(
      options.maxRedirects,
      defaults.maxRedirects,
      HARD_MAX_REDIRECTS,
      "maxRedirects",
    );
    const extraHeaders = checkedHeaders(options.headers);
    let url = checkedUrl(input, { allowHttp });

    for (let redirectCount = 0; ; redirectCount += 1) {
      let response;
      try {
        response = await fetchImpl(url, {
          method: "GET",
          redirect: "manual",
          signal: AbortSignal.timeout(requestTimeoutMs),
          headers: {
            accept,
            "user-agent": userAgent,
            ...extraHeaders,
          },
        });
      } catch (error) {
        throw new FetchJsonError(`request failed for ${url.href}: ${error.message}`, { cause: error });
      }

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (redirectCount >= requestMaxRedirects) {
          throw new FetchJsonError(`too many redirects while fetching ${url.href}`);
        }
        const location = response.headers.get("location");
        if (!location) throw new FetchJsonError(`redirect from ${url.href} has no Location header`);
        url = checkedUrl(new URL(location, url), { allowHttp });
        continue;
      }

      if (!response.ok) {
        throw new FetchJsonError(`HTTP ${response.status} while fetching ${url.href}`, {
          status: response.status,
          url: url.href,
          retryAfterMs: retryAfterMilliseconds(response),
        });
      }

      const contentType = response.headers.get("content-type");
      if (!contentType) {
        throw new FetchJsonError(`expected ${expectedContent} from ${url.href}, received no Content-Type`);
      }
      if (!contentTypeMatches(contentType)) {
        throw new FetchJsonError(`expected ${expectedContent} from ${url.href}, received ${contentType}`);
      }

      try {
        return await readBoundedBody(response, requestMaxBytes);
      } catch (error) {
        if (error instanceof FetchJsonError) throw error;
        throw new FetchJsonError(`could not read response from ${url.href}: ${error.message}`, { cause: error });
      }
    }
  };
}

/**
 * Create a bounded text fetcher for public data files such as CSV or a static
 * JavaScript data assignment. It has the same GET/HTTPS/timeout/size/redirect
 * boundary as the JSON helper, but never evaluates the returned text.
 */
export function createFetchText(options = {}) {
  return createBoundedTextFetcher(options, {
    helperName: "fetchText",
    accept: "text/plain, text/*;q=0.9, application/javascript;q=0.8",
    contentTypeMatches: (contentType) =>
      /^(?:text\/|application\/(?:javascript|x-javascript)(?:\s*;|$))/i.test(contentType),
    expectedContent: "a text response",
  });
}

/**
 * Create a bounded JSON fetcher. JSON parsing happens only after the complete
 * response has passed the shared transport and byte limits.
 */
export function createFetchJson(options = {}) {
  const fetchText = createBoundedTextFetcher(options, {
    helperName: "fetchJson",
    accept: "application/json",
    contentTypeMatches: (contentType) =>
      /(?:^|\s|;)application\/(?:[a-z0-9.+-]*\+)?json(?:\s*;|$)/i.test(contentType),
    expectedContent: "a JSON response",
  });

  return async function fetchJson(input, requestOptions = {}) {
    const text = await fetchText(input, requestOptions);
    try {
      return JSON.parse(text);
    } catch (error) {
      let url;
      try {
        url = checkedUrl(input, { allowHttp: options.allowHttp ?? false }).href;
      } catch {
        url = String(input);
      }
      throw new FetchJsonError(`invalid JSON from ${url}: ${error.message}`, { cause: error });
    }
  };
}

export const fetchText = createFetchText();
export const fetchJson = createFetchJson();
