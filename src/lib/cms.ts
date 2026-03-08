import { getCollection, getEntry } from "astro:content";
import type { Locale } from "@/types/cms";
import { DEFAULT_LOCALE } from "@/types/cms";

// ---------------------------------------------------------------------------
// i18n route helper
// ---------------------------------------------------------------------------

export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const clean = path.replace(/^\/+/, "");
  if (locale === DEFAULT_LOCALE) return `/${clean}`;
  return `/${locale}/${clean}`;
}

// ---------------------------------------------------------------------------
// Page data fetcher
// ---------------------------------------------------------------------------

export async function getPageData(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const entry = await getEntry("pages", `${locale}/${slug}`);
  return entry?.data ?? null;
}

// ---------------------------------------------------------------------------
// Service page fetcher
// ---------------------------------------------------------------------------

export async function getServiceData(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const entry = await getEntry("services", `${locale}/${slug}`);
  return entry?.data ?? null;
}

// ---------------------------------------------------------------------------
// Service listing
// ---------------------------------------------------------------------------

export interface ServiceListItem {
  name: string;
  slug: string;
}

export async function getServicesList(locale: Locale = DEFAULT_LOCALE): Promise<ServiceListItem[]> {
  const entries = await getCollection("services", ({ id }) => id.startsWith(`${locale}/`));

  return entries.map((entry) => ({
    name: entry.data.title,
    slug: entry.id.replace(`${locale}/`, ""),
  }));
}
