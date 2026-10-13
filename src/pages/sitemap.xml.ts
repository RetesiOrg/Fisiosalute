import type { APIRoute } from "astro";
import { allServices, serviceAreas } from "../data/services";

export const prerender = true;

const staticPages = [
  "/",
  "/altri-professionisti/",
  "/carta-dei-servizi/",
  "/collaborazioni/",
  "/contatti/",
  "/cookie-policy/",
  "/dove-siamo/",
  "/equipe-medica/",
  "/erika-voltan/",
  "/informazioni-paziente/",
  "/news/",
  "/privacy-policy/",
  "/servizi/",
  "/staff/",
];

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error("Astro `site` must be configured to generate the sitemap.");
  }

  const paths = [
    ...staticPages,
    ...serviceAreas.map((area) => `/servizi/area/${area.slug}/`),
    ...allServices.map((service) => `/servizi/${service.slug}/`),
  ];
  const urls = [...new Set(paths)]
    .sort()
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
