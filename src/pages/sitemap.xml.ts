import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const SITE_URL = import.meta.env.SITE ?? "https://maininsurance.gr";
const DEFAULT_LOCALE = "en";

function buildUrl(locale: string, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}/${path}`.replace(/\/+$/, "");
}

export const GET: APIRoute = async () => {
  const pages = await getCollection("pages");
  const services = await getCollection("services");

  const pageUrls = pages.map((entry) => {
    const [locale, slug] = entry.id.split("/");
    const path = slug === "home" ? "" : slug;
    return buildUrl(locale, path);
  });

  const serviceUrls = services.map((entry) => {
    const [locale, slug] = entry.id.split("/");
    return buildUrl(locale, `services/${slug}`);
  });

  const allUrls = [...pageUrls, ...serviceUrls];
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
