// Solo server/build: le credenziali OAuth non devono arrivare al browser.
const stars = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

/**
 * @param {Record<string, string | undefined>} env
 * @param {typeof fetch} request
 */
export async function loadBusinessReviews(env, request = fetch) {
  const config = [env.GOOGLE_BUSINESS_CLIENT_ID, env.GOOGLE_BUSINESS_CLIENT_SECRET,
    env.GOOGLE_BUSINESS_REFRESH_TOKEN, env.GOOGLE_BUSINESS_LOCATION];
  if (config.every(value => !value)) return null;
  if (config.some(value => !value)) throw new Error('Configurazione Google Business incompleta.');
  const [clientId, clientSecret, refreshToken, location] = config;
  if (!/^accounts\/\d+\/locations\/\d+$/.test(location)) {
    throw new Error('GOOGLE_BUSINESS_LOCATION deve essere accounts/ID/locations/ID.');
  }
  const tokenResponse = await request('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret,
      refresh_token: refreshToken, grant_type: 'refresh_token' }),
    signal: AbortSignal.timeout(15000),
  });
  if (!tokenResponse.ok) throw new Error(`Google Business OAuth: HTTP ${tokenResponse.status}.`);
  const token = await tokenResponse.json();
  if (!token.access_token) throw new Error('Google Business OAuth: token mancante.');

  const reviews = [];
  let pageToken;
  let rating;
  let userRatingCount;
  const seenTokens = new Set();
  // L'API ordina per ultima modifica, non per pubblicazione. Leggiamo tutte le
  // pagine prima di selezionare le quattro recensioni pubblicate più di recente.
  do {
    const endpoint = new URL(`https://mybusiness.googleapis.com/v4/${location}/reviews`);
    endpoint.searchParams.set('pageSize', '50');
    endpoint.searchParams.set('orderBy', 'updateTime desc');
    if (pageToken) endpoint.searchParams.set('pageToken', pageToken);
    const response = await request(endpoint, {
      headers: { Authorization: `Bearer ${token.access_token}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Google Business recensioni: HTTP ${response.status}.`);
    const page = await response.json();
    rating ??= page.averageRating;
    userRatingCount ??= page.totalReviewCount;
    reviews.push(...(page.reviews ?? []));
    pageToken = page.nextPageToken;
    if (pageToken && seenTokens.has(pageToken)) throw new Error('Google Business: paginazione non valida.');
    if (pageToken) seenTokens.add(pageToken);
  } while (pageToken);

  const dateFormat = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome',
  });
  return {
    rating, userRatingCount,
    reviews: reviews
      .filter(review => review.comment?.trim() && stars[review.starRating])
      .sort((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime))
      .slice(0, 4)
      .map(review => ({
        rating: stars[review.starRating],
        publishTime: review.createTime,
        relativePublishTimeDescription: dateFormat.format(new Date(review.createTime)),
        text: { text: review.comment },
        authorAttribution: { displayName: review.reviewer?.displayName ?? 'Utente Google' },
      })),
  };
}
