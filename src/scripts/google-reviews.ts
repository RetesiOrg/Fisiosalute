type ReviewFeed = {
  version: number;
  updatedAt: string;
  rating: number;
  userRatingCount: number;
  mapsUrl: string;
  reviews: { rating: number; publishTime: string; text: string; author: string }[];
};

export function validReviewFeed(value: unknown, now = Date.now()): value is ReviewFeed {
  if (!value || typeof value !== 'object') return false;
  const feed = value as ReviewFeed;
  const timestamp = Date.parse(feed.updatedAt);
  return feed.version === 1 && Number.isFinite(timestamp) && timestamp <= now + 60000 && now - timestamp <= 86400000 &&
    Number.isFinite(feed.rating) && feed.rating >= 0 && feed.rating <= 5 &&
    Number.isInteger(feed.userRatingCount) && feed.userRatingCount >= 0 &&
    typeof feed.mapsUrl === 'string' && /^https:\/\/www\.google\.com\/maps(?:[/?]|$)/.test(feed.mapsUrl) &&
    Array.isArray(feed.reviews) && feed.reviews.length <= 4 && feed.reviews.every(review => review &&
      Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5 &&
      typeof review.text === 'string' && typeof review.author === 'string' && Number.isFinite(Date.parse(review.publishTime)));
}

export function renderReviewFeed(section: HTMLElement, feed: ReviewFeed) {
  const track = section.querySelector<HTMLElement>('.reviews-track');
  const summary = section.querySelector<HTMLElement>('.reviews-summary');
  if (!track || !summary) return;
  const dateFormat = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' });
  const element = (tag: string, text: string, className = '') => {
    const node = document.createElement(tag);
    node.textContent = text;
    node.className = className;
    return node;
  };
  const cards = feed.reviews.map(review => {
    const card = element('article', '', 'review-card');
    const top = element('div', '', 'review-card-top');
    const stars = element('span', '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating), 'review-stars');
    stars.setAttribute('aria-label', `${review.rating} stelle`);
    top.append(stars, element('span', dateFormat.format(new Date(review.publishTime))));
    const author = element('a', '', 'review-author') as HTMLAnchorElement;
    author.href = feed.mapsUrl;
    author.target = '_blank';
    author.rel = 'noreferrer';
    author.append(element('strong', review.author), element('span', 'Apri le recensioni su Google ↗'));
    card.append(top, element('p', review.text), author);
    return card;
  });
  track.replaceChildren(...cards);
  const rating = element('strong', feed.rating.toFixed(1));
  const count = element('small', `${feed.userRatingCount} recensioni su Google`);
  const stars = element('span', '★'.repeat(Math.round(feed.rating)) + '☆'.repeat(5 - Math.round(feed.rating)), 'review-stars');
  stars.setAttribute('aria-label', `${feed.rating} stelle`);
  summary.replaceChildren(...(feed.userRatingCount ? [rating, stars, count] : [count]));
  const attribution = section.querySelector('.google-attribution');
  if (attribution) attribution.textContent = `Recensioni fornite da Google · aggiornate il ${dateFormat.format(new Date(feed.updatedAt))}`;
}

export async function updateGoogleReviews(section: HTMLElement) {
  const endpoint = section.dataset.reviewsEndpoint;
  if (!endpoint) return;
  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(10000), cache: 'no-store' });
    if (!response.ok) return;
    const feed: unknown = await response.json();
    if (validReviewFeed(feed)) renderReviewFeed(section, feed);
  } catch { /* Keep the dated static reviews if the Aruba feed is unavailable. */ }
}
