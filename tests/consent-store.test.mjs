import test from 'node:test';
import assert from 'node:assert/strict';
import { parseConsent, newConsent } from '../src/scripts/consent-store.ts';
const now = new Date('2026-10-02T12:00:00Z');
test('first visit, malformed, outdated and expired choices fail closed', () => {
  for (const raw of [null, '', '{', 'null', '{}', JSON.stringify({version:0,maps:true,expires:now.getTime()+1}), JSON.stringify({version:1,maps:'true',expires:now.getTime()+1}), JSON.stringify({version:1,maps:true,expires:now.getTime()})]) assert.equal(parseConsent(raw,now.getTime()),null);
});
test('accept and reject both persist with six-month expiry', () => {
  for (const maps of [true,false]) {
    const choice = newConsent(maps,now);
    assert.equal(choice.maps,maps);
    assert.equal(choice.expires,new Date('2027-04-02T12:00:00Z').getTime());
    assert.deepEqual(parseConsent(JSON.stringify(choice),now.getTime()),choice);
    assert.equal(parseConsent(JSON.stringify(choice),choice.expires),null);
  }
});
