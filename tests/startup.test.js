import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Script} from 'node:vm';

test('index.html usa scripts clásicos locales compatibles con file://',async()=>{
 const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 const scripts=[...html.matchAll(/<script\b([^>]*)><\/script>/g)].map(m=>m[1]);
 assert.equal(scripts.length,2);
 assert.ok(scripts.every(s=>!s.includes('type="module"')&&!/https?:\/\//.test(s)));
 assert.match(scripts[0],/src="js\/boot.js"/);
 assert.match(scripts[1],/src="js\/game.bundle.js"/);
 assert.match(html,/id="boot-status"/);
 for(const attributes of scripts){
  const source=attributes.match(/src="([^"]+)"/)[1];
  const code=await readFile(new URL('../'+source,import.meta.url),'utf8');
  assert.doesNotThrow(()=>new Script(code,{filename:source}));
  assert.doesNotMatch(code,/\bimport\s*\(/);
  assert.doesNotMatch(code,/\bfetch\s*\(/);
 }
});
