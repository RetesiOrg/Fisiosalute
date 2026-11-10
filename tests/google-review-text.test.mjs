import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { originalReviewText } from '../src/data/google-review-text.mjs';

test('preserves original language and paragraphs across Google translation formats', () => {
  const cases = JSON.parse(fs.readFileSync(new URL('./google-review-text-cases.json', import.meta.url), 'utf8'));
  for (const { input, expected } of cases) assert.equal(originalReviewText(input), expected);
});
