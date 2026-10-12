export function validateInstagramFeed(payload) {
  if (!Array.isArray(payload?.posts) || !payload.posts.length) return null;
  const posts = payload.posts.slice(0, 2);
  const image = /^(?:api\/instagram-images\/\d+-[a-f0-9]{16}|images\/instagram\/[A-Za-z0-9_-]+)\.(?:jpg|png|webp)$/;
  const permalink = /^https:\/\/(?:www\.)?instagram\.com\/(?:[^/]+\/)?(?:p|reel)\/[A-Za-z0-9_-]+\/?$/;
  for (const post of posts) {
    if (typeof post?.title !== 'string' || !post.title.trim() || post.title.length > 1000 ||
        typeof post.image !== 'string' || !image.test(post.image) ||
        typeof post.url !== 'string' || !permalink.test(post.url) ||
        (post.date != null && (typeof post.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(post.date) ||
        (!Number.isFinite(Date.parse(post.date)) || new Date(post.date).toISOString().slice(0, 10) !== post.date)))) return null;
  }
  return posts;
}
