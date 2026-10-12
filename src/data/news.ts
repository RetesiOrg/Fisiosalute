export const instagramProfileUrl = "https://www.instagram.com/_fisiosalute_/";
import { generatedInstagramPosts } from "./instagram.generated";

const fallbackInstagramPosts = [
  {
    "url": "https://www.instagram.com/p/Dd6LaopDVUv/",
    "image": "/images/instagram/Dd6LaopDVUv.jpg",
    "title": "FisioSalute al fianco dei giocatori MGM 2000",
    "date": "",
    "dateLabel": ""
  },
  {
    "url": "https://www.instagram.com/p/Dd5xyyFjhbG/",
    "image": "/images/instagram/Dd5xyyFjhbG.jpg",
    "title": "La dott.ssa Benedetta Nicolussi: dal gennaio 2027 nello staff FisioSalute",
    "date": "",
    "dateLabel": ""
  }
] as const;

type InstagramApiPost = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

const formatDate = (value: string) => new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(value));

const instagramAccessToken = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const instagramUserId = import.meta.env.INSTAGRAM_USER_ID;

let latestInstagramPosts: Array<{ url: string; image: string; title: string; date: string; dateLabel: string }> = generatedInstagramPosts.length
  ? [...generatedInstagramPosts]
  : [...fallbackInstagramPosts];

if (instagramAccessToken && instagramUserId) {
  try {
    const endpoint = new URL(`https://graph.facebook.com/v23.0/${instagramUserId}/media`);
    endpoint.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    endpoint.searchParams.set("limit", "6");
    endpoint.searchParams.set("access_token", instagramAccessToken);

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Instagram API: ${response.status}`);
    const payload = await response.json() as { data?: InstagramApiPost[] };

    if (payload.data?.length) {
      latestInstagramPosts = payload.data
        .filter((post) => ["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(post.media_type))
        .map((post) => ({
          url: post.permalink,
          image: post.media_url ?? post.thumbnail_url ?? "",
          title: post.caption?.split("\n")[0]?.trim() || "Una novità da FisioSalute",
          date: post.timestamp.slice(0, 10),
          dateLabel: formatDate(post.timestamp),
        }));
    }
  } catch (error) {
    console.warn("Instagram Graph API non disponibile, uso i post di riserva:", error);
  }
}

export { latestInstagramPosts };
