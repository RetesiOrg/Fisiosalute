import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateInstagramFeed} from '../src/data/instagram-feed.mjs';
const post = {title:'Una novità',image:'api/instagram-images/123-0123456789abcdef.jpg',url:'https://www.instagram.com/p/abc/',date:'2026-10-05'};
test('valid local feed, limited to two cards',()=>assert.equal(validateInstagramFeed({posts:[post,post,post]}).length,2));
test('rejects external images, traversal, links and impossible dates',()=>{
 for(const replacement of [{image:'https://example.com/x.jpg'},{image:'../secret.jpg'},{url:'javascript:alert(1)'},{date:'2026-02-31'}]) assert.equal(validateInstagramFeed({posts:[{...post,...replacement}]}),null);
});
test('supports static original artwork as fallback',()=>assert.ok(validateInstagramFeed({posts:[{...post,image:'images/instagram/Dcd6L8ECKeJ.jpg'}]})));
test('manual latest posts can omit unverified publication dates',()=>assert.ok(validateInstagramFeed({posts:[{...post,date:null}]})));
