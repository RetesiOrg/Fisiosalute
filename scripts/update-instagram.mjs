import { writeFile } from "node:fs/promises";

const userId = process.env.INSTAGRAM_USER_ID;
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!userId || !accessToken) {
  throw new Error("Mancano INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN");
}

const endpoint = new URL(`https://graph.facebook.com/v23.0/${userId}/media`);
endpoint.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
endpoint.searchParams.set("limit", "6");
endpoint.searchParams.set("access_token", accessToken);

const response = await fetch(endpoint);
if (!response.ok) throw new Error(`Instagram Graph API: ${response.status} ${await response.text()}`);

const payload = await response.json();
const posts = (payload.data ?? [])
  .filter((post) => ["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(post.media_type))
  .slice(0, 2)
  .map((post) => ({
    url: post.permalink,
    image: post.media_url ?? post.thumbnail_url ?? "",
    title: post.caption?.split("\n")[0]?.trim() || "Una novità da FisioSalute",
    date: post.timestamp.slice(0, 10),
    dateLabel: new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.timestamp)),
  }));

if (!posts.length) throw new Error("Instagram non ha restituito post pubblicabili");

const output = `// Generato automaticamente: non modificare a mano.\nexport const generatedInstagramPosts = ${JSON.stringify(posts, null, 2)} as const;\n`;
await writeFile("src/data/instagram.generated.ts", output);
console.log(`Aggiornati ${posts.length} post Instagram.`);
