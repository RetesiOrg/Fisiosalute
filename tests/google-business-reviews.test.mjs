import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBusinessReviews } from '../src/data/google-business-reviews.mjs';

const env = { GOOGLE_BUSINESS_CLIENT_ID: 'test-client',
  GOOGLE_BUSINESS_CLIENT_SECRET: 'test-secret', GOOGLE_BUSINESS_REFRESH_TOKEN: 'test-refresh',
  GOOGLE_BUSINESS_LOCATION: 'accounts/123/locations/456' };
const response = data => Response.json(data);

test('senza credenziali mantiene Places; configurazione parziale viene segnalata', async () => {
  const noRequest = () => { throw new Error('Non deve contattare Google'); };
  assert.equal(await loadBusinessReviews({}, noRequest), null);
  await assert.rejects(loadBusinessReviews({ GOOGLE_BUSINESS_CLIENT_ID: 'client' }, noRequest), /incompleta/);
  await assert.rejects(loadBusinessReviews({ ...env, GOOGLE_BUSINESS_LOCATION: '../other' }, noRequest), /accounts/);
});

test('legge tutte le pagine e sceglie per pubblicazione, anche quando una vecchia è stata modificata', async () => {
  const calls = [];
  const review = (name, date, rating = 'FIVE', comment = 'Recensione pubblica') => ({
    reviewer: { displayName: name }, createTime: date, starRating: rating, comment,
  });
  const request = async (url, options) => {
    calls.push({ url: String(url), options });
    if (calls.length === 1) return response({ access_token: 'test-access' });
    assert.equal(options.headers.Authorization, 'Bearer test-access');
    const endpoint = new URL(url);
    assert.equal(endpoint.searchParams.get('orderBy'), 'updateTime desc');
    if (!endpoint.searchParams.has('pageToken')) return response({ averageRating: 4.9,
      totalReviewCount: 204, nextPageToken: 'page2', reviews: [
        review('Vecchia modificata oggi', '2020-01-01T00:00:00Z'),
        review('Sara', '2026-10-02T00:00:00Z'),
        review('Solo stelle', '2026-10-04T00:00:00Z', 'FIVE', ''),
      ] });
    assert.equal(endpoint.searchParams.get('pageToken'), 'page2');
    return response({ reviews: [review('Ernesto', '2026-09-14T00:00:00Z', 'FOUR'),
      review('Terza', '2026-09-01T00:00:00Z'), review('Quarta', '2026-08-01T00:00:00Z')] });
  };
  const result = await loadBusinessReviews(env, request);
  assert.equal(calls.length, 3);
  assert.equal(result.userRatingCount, 204);
  assert.equal(result.rating, 4.9);
  assert.deepEqual(result.reviews.map(r => r.authorAttribution.displayName), ['Sara', 'Ernesto', 'Terza', 'Quarta']);
  assert.equal(result.reviews[1].rating, 4);
  assert.equal(JSON.stringify(result).includes('test-access'), false);
});

test('se OAuth o API falliscono, segnala errore senza esporre credenziali', async () => {
  await assert.rejects(loadBusinessReviews(env, async () => new Response('secret details', { status: 401 })),
    { message: 'Google Business OAuth: HTTP 401.' });
  let count = 0;
  await assert.rejects(loadBusinessReviews(env, async () => ++count === 1
    ? response({ access_token: 'test-access' }) : new Response('', { status: 403 })),
    { message: 'Google Business recensioni: HTTP 403.' });
});
