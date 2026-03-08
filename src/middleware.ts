import { defineMiddleware } from "astro:middleware";

const SKIP_RE = /\.(png|jpe?g|gif|webp|avif|svg|ico|css|js|woff2?|ttf|xml|txt|json|webmanifest)$/;
const SKIP_PREFIXES = ["/_astro", "/_image", "/api", "/favicon.ico"];

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (SKIP_RE.test(pathname) || SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return next();
  }

  const cookie = context.cookies.get("preferred_lang")?.value as "en" | "el" | undefined;

  const isGreekPath = pathname === "/el" || pathname.startsWith("/el/");

  if (cookie) {
    if (cookie === "el" && !isGreekPath) {
      return context.redirect(`/el${pathname === "/" ? "" : pathname}`, 302);
    }
    if (cookie === "en" && isGreekPath) {
      return context.redirect(pathname.replace(/^\/el\/?/, "/") || "/", 302);
    }
    return next();
  }

  // No cookie — first visit. Use geolocation to decide, then set cookie
  // so subsequent navigation stays put.
  const country = context.request.headers.get("x-vercel-ip-country");

  if (country === "GR" && !isGreekPath) {
    context.cookies.set("preferred_lang", "el", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return context.redirect(`/el${pathname === "/" ? "" : pathname}`, 302);
  }

  if (country && country !== "GR" && isGreekPath) {
    context.cookies.set("preferred_lang", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return context.redirect(pathname.replace(/^\/el\/?/, "/") || "/", 302);
  }

  // No cookie, no Vercel header (local dev or direct navigation) — pass through
  return next();
});
