import { test } from 'node:test';
import assert from 'node:assert/strict';
import { duplicateVariationIssues } from '../lib/collection-source.ts';
test('rejects a same-name duplicate variation without merging distinct subsets',()=>{
 const original={slug:'peperothko',name:'Peperothko',assets:[{asset:'PEPEROTHKO'},{asset:'PEPEROTHKO.LUCA'}]};
 const duplicate={...original,slug:'peperothko-variants',name:'PEPEROTHKO',variation_of:'PEPEROTHKO',assets:[...original.assets].reverse()};
 assert.equal(duplicateVariationIssues([original,duplicate]).length,1);
 assert.deepEqual(duplicateVariationIssues([original,{...duplicate,assets:[{asset:'PEPEROTHKO'}]}]),[]);
 assert.deepEqual(duplicateVariationIssues([{...original,variation_of:'PEPEROTHKO'}]),[]);
});
