export type { Block, PageData } from "@/content/config";

// ---------------------------------------------------------------------------
// Locale — mirrors the locales defined in astro.config.mjs
// ---------------------------------------------------------------------------

export type Locale = "en" | "el";

export const DEFAULT_LOCALE: Locale = "en";

// ---------------------------------------------------------------------------
// Shared primitives — reusable across multiple blocks
// ---------------------------------------------------------------------------

export interface CmsImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface CmsLink {
  label: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Globals — site-wide singletons editable in the CMS
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  url?: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: "x" | "facebook" | "instagram" | "linkedin";
  url: string;
}

export interface SiteSettings {
  siteName: string;
  logo: CmsImage;
  logoAlt: CmsImage;
  favicon: string;
  socialLinks: SocialLink[];
}

export interface HeaderGlobal {
  navigation: NavItem[];
  ctaButton: CmsLink;
}

export interface FooterGlobal {
  description: string;
  columns: {
    title: string;
    links: CmsLink[];
  }[];
  newsletter?: {
    title: string;
    placeholder: string;
    buttonLabel: string;
  };
  copyright: string;
}

// ---------------------------------------------------------------------------
// Breadcrumb — used by non-landing pages
// ---------------------------------------------------------------------------

export interface BreadcrumbData {
  title: string;
  path: CmsLink[];
  current: string;
}
