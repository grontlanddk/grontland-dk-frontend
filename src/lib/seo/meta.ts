import type { Metadata } from "next";

/* Site-level meta strings, shared by the root layout (defaults) and the home
   page (which must re-state the full Open Graph set because Next's metadata
   merge is shallow — a page-level `openGraph` replaces the layout's). */

/** Public origin used for canonical, hreflang, OG, sitemap and JSON-LD URLs.
    Override via NEXT_PUBLIC_SITE_URL (no trailing slash) when the domain
    changes — it's inlined at build time, so a redeploy applies it; no code
    edits needed. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://grontland.dk").replace(
  /\/$/,
  "",
);
export const SITE_META = {
  da: {
    title: "Grønt Land DK — Renovering og byggearbejde i København",
    description:
      "Grønt Land DK hjælper private boligejere og entreprenører med renovering, facadearbejde, belægning, tømrerarbejde, murerarbejde, malerarbejde og havearbejde i København og Storkøbenhavn.",
  },
} as const;

export const OG_IMAGE = { url: "/og-home.jpg", width: 1200, height: 630 } as const;

/** Self-canonical + da-DK / x-default hreflang for a route. `path` is the
    locale-less route path ("" for home, "/ydelser/x", …). */
export const localeAlternates = (_locale: string, path: string) => {
  const da = path || "/";
  return {
    canonical: da,
    languages: { "da-DK": da, "x-default": da },
  };
};

/** One-stop page metadata: title/description + self-canonical/hreflang + a
    complete per-page Open Graph set (Next's metadata merge is shallow, so
    every page that wants og:url must re-state the whole OG object — this
    helper is that statement). `image` overrides the site og-home fallback. */
export function pageMetadata(opts: {
  locale: string;
  /** Locale-less route path — "" for home, "/ydelser/x", … */
  path: string;
  title: string;
  description?: string | null;
  image?: { url: string; alt?: string | null } | null;
}): Metadata {
  const { locale, path, title, description, image } = opts;
  return {
    title,
    description: description ?? undefined,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: "Grønt Land DK",
      title,
      description: description ?? undefined,
      url: path || "/",
      locale: "da_DK",
      images: [image ? { url: image.url, alt: image.alt ?? title } : { ...OG_IMAGE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
      images: [image?.url ?? OG_IMAGE.url],
    },
  };
}
