import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../src/scripts/google-reviews.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { validReviewFeed } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const now = Date.parse('2026-10-09T12:00:00Z');
const feed = { version: 1, updatedAt: '2026-10-09T10:00:00Z', rating: 4.2, userRatingCount: 207,
  mapsUrl: 'https://www.google.com/maps?cid=10979002377613333578',
  reviews: [{ rating: 1, publishTime: '2026-10-08T10:00:00Z', text: '<img onerror=alert(1)>', author: 'Author' }] };
test('accepts recent feed including negative review and empty deleted feed', () => {
  assert.ok(validReviewFeed(feed, now));
  assert.ok(validReviewFeed({ ...feed, reviews: [], rating: 0, userRatingCount: 0 }, now));
});
test('rejects expired, future and invalid data without replacing static reviews', () => {
  for (const patch of [{ updatedAt: '2026-10-07' }, { updatedAt: '2026-10-10' }, { rating: 6 },
    { userRatingCount: -1 }, { mapsUrl: 'javascript:alert(1)' },
    { mapsUrl: 'https://www.google.com.attacker.test/maps' }, { reviews: [...feed.reviews, ...feed.reviews, ...feed.reviews, ...feed.reviews, ...feed.reviews] },
    { reviews: [{ ...feed.reviews[0], rating: 8 }] }, { reviews: [{ ...feed.reviews[0], publishTime: 'bad' }] }]) {
    assert.equal(validReviewFeed({ ...feed, ...patch }, now), false);
  }
});
