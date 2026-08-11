/**
 * CMS reads — every query projects documents into the site's existing
 * TypeScript shapes, so sections/components keep their props and only the
 * data source changes. Text fields are plain DA strings (locales flattened
 * 2026-08). Slug-only queries need no request context (sitemap.ts).
 */
import type { Project } from "@/constants/projects";

import { sanityFetch } from "./fetch";

/* GROQ path helper — kept so projections stay readable after the locale strip. */
const l = (field: string) => field;

/* Shared projection snippets */
/* Image src projects the FULL object (asset ref + editor crop/hotspot) —
   sanityFetch's resolveImageUrls turns it into a urlFor() URL string, so
   Studio crops are honored while consumers keep the plain {src, alt} shape. */
const IMG_SRC = `{asset, crop, hotspot}`;
const IMG = `{"src": ${IMG_SRC}, "alt": ${l("alt")}}`;
const CTA = `{"label": ${l("label")}, href}`;

function localeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return sanityFetch<T>(query, params);
}

// ---------------------------------------------------------------------------
// siteSettings
// ---------------------------------------------------------------------------
export type SiteSettings = {
  phone: string;
  phoneHref: string;
  email: string;
  cvr: string;
  area: string;
  hours: string | null;
  replyPromise: string | null;
  footerBlurb: string | null;
  copyright: string | null;
};

export function getSiteSettings(): Promise<SiteSettings> {
  return localeFetch<SiteSettings>(
    `*[_id == "siteSettings"][0]{
      phone, phoneHref, email, cvr,
      "area": ${l("area")}, "hours": ${l("hours")}, "replyPromise": ${l("replyPromise")},
      "footerBlurb": ${l("footerBlurb")}, copyright
    }`,
  );
}

// ---------------------------------------------------------------------------
// shared shapes
// ---------------------------------------------------------------------------
export type Img = { src: string; alt: string };
export type Cta = { label: string; href: string };

export type HeroData = {
  label: string | null;
  h1: string;
  sub: string;
  image: Img | null;
  ctas: Cta[] | null;
  trustChips: string[] | null;
};

export type CtaBandData = {
  h2: string;
  text: string;
  primary: Cta;
  crosslinks: Cta[] | null;
  image: Img | null;
};

export type SeoTextData = { h2: string; text: string; images: Img[] | null };

const HERO = `{"label": ${l("label")}, "h1": ${l("h1")}, "sub": ${l("sub")}, "image": image${IMG}, "ctas": ctas[]${CTA}, "trustChips": trustChips}`;
const CTA_BAND = `{"h2": ${l("h2")}, "text": ${l("text")}, "primary": primary${CTA}, "crosslinks": crosslinks[]${CTA}, "image": image${IMG}}`;
const SEO_TEXT = `{"h2": ${l("h2")}, "text": ${l("text")}, "images": images[]${IMG}}`;

// ---------------------------------------------------------------------------
// projects — projected into the existing `Project` type (constants/projects.ts)
// ---------------------------------------------------------------------------
const PROJECT = `{
  "slug": slug.current,
  "title": ${l("title")},
  location,
  "objectType": ${l("objectType")},
  category,
  "serviceLabel": coalesce(serviceLabel, primaryService->nav),
  "serviceHref": "/ydelser/" + primaryService->slug.current,
  "services": services[]->{"label": ${l("nav")}, "href": "/ydelser/" + slug.current},
  "cardDesc": ${l("cardDesc")},
  "cardImage": cardImage${IMG_SRC},
  "cardImageAlt": ${l("cardImage.alt")},
  "heroImage": heroImage${IMG_SRC},
  "heroImageAlt": ${l("heroImage.alt")},
  "seoDescription": ${l("seo.description")},
  "intro": ${l("intro")},
  "task": ${l("task")},
  "work": work,
  "focus": focus,
  "result": ${l("result")},
  "facts": facts[]{"label": ${l("label")}, "value": ${l("value")}},
  "gallery": gallery[]{"src": image${IMG_SRC}, "alt": ${l("image.alt")}, kind},
  "relatedSlugs": related[]->slug.current
}`;

export function getProjects(): Promise<Project[]> {
  return localeFetch<Project[]>(`*[_type == "project"] | order(_createdAt asc) ${PROJECT}`);
}

/** Newest-first project list (audience landings / “latest N” teaser blocks). */
export function getProjectsNewestFirst(): Promise<Project[]> {
  return localeFetch<Project[]>(`*[_type == "project"] | order(_createdAt desc) ${PROJECT}`);
}

export function getProjectBySlug(slug: string): Promise<(Project & { related: Project[] }) | null> {
  return localeFetch(
    `*[_type == "project" && slug.current == $slug][0]{
      ...${PROJECT},
      "related": related[]->${PROJECT}
    }`,
    { slug },
  );
}

export function getProjectSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(`*[_type == "project"].slug.current`);
}

export type ProjekterPageData = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string | null;
  emptyFilter: string | null;
  cta: CtaBandData | null;
};

export function getProjekterPage(): Promise<ProjekterPageData> {
  return localeFetch<ProjekterPageData>(
    `*[_id == "projekterPage"][0]{
      "metaTitle": ${l("seo.title")},
      "metaDescription": ${l("seo.description")},
      "h1": ${l("h1")},
      "sub": ${l("sub")},
      "emptyFilter": ${l("emptyFilter")},
      "cta": cta${CTA_BAND}
    }`,
  );
}

// ---------------------------------------------------------------------------
// services — ServiceContent shape with cases/photos embedded
// ---------------------------------------------------------------------------
export type ServicePageData = {
  slug: string;
  nav: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  heroImage: Img;
  trustChips: string[];
  scope: { h2: string; items: { title: string; desc: string }[] };
  process: { h2: string; steps: { title: string; desc: string }[] };
  processImage: Img | null;
  ctaImage: Img | null;
  cases: Project[];
  galleryPhotos: Img[];
  faq: { h2: string; items: { q: string; a: string }[] };
  seoText: SeoTextData;
};

const SERVICE_PAGE = `{
  "slug": slug.current,
  "nav": ${l("nav")},
  "metaTitle": ${l("seo.title")},
  "metaDescription": ${l("seo.description")},
  "h1": ${l("hero.h1")},
  "heroSub": ${l("hero.sub")},
  "heroImage": hero.image${IMG},
  "trustChips": hero.trustChips,
  "scope": scope{"h2": ${l("h2")}, "items": items[]{"title": ${l("title")}, "desc": ${l("desc")}}},
  "process": process{"h2": ${l("h2")}, "steps": steps[]{"title": ${l("title")}, "desc": ${l("desc")}}},
  "processImage": process.backgroundImage${IMG},
  "ctaImage": ctaImage${IMG},
  "cases": coalesce(cases[]->${PROJECT}, []),
  "galleryPhotos": galleryCategory->photos[]${IMG},
  "faq": faq{"h2": ${l("h2")}, "items": items[]{"q": ${l("q")}, "a": ${l("a")}}},
  "seoText": seoText${SEO_TEXT}
}`;

export function getServiceBySlug(slug: string): Promise<ServicePageData | null> {
  return localeFetch(`*[_type == "service" && slug.current == $slug][0]${SERVICE_PAGE}`, { slug });
}

export function getServiceSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(`*[_type == "service"] | order(order asc).slug.current`);
}

export type YdelserIndexData = {
  metaTitle: string;
  metaDescription: string;
  hero: HeroData;
  cta: CtaBandData | null;
  cards: { slug: string; title: string; desc: string; image: Img }[];
};

export function getYdelserIndex(): Promise<YdelserIndexData> {
  return localeFetch<YdelserIndexData>(
    `*[_id == "ydelserIndexPage"][0]{
      "metaTitle": ${l("seo.title")},
      "metaDescription": ${l("seo.description")},
      "hero": hero${HERO},
      "cta": cta${CTA_BAND},
      "cards": *[_type == "service"] | order(order asc) {
        "slug": slug.current,
        "title": ${l("nav")},
        "desc": coalesce(cardDesc, hero.sub),
        "image": hero.image${IMG}
      }
    }`,
  );
}

// ---------------------------------------------------------------------------
// collection snippets for the constants-based ("local") pages — home, om-os,
// private, entreprenorer keep their copy in constants but render gallery/
// projects/services data from the CMS so it stays in sync with the
// collection pages.
// ---------------------------------------------------------------------------
export type GalleryCategoryData = { id: string; label: string; photos: Img[] };

export function getGalleryCategories(): Promise<GalleryCategoryData[]> {
  return localeFetch<GalleryCategoryData[]>(
    `*[_type == "galleryCategory"] | order(order asc) {
      "id": key,
      "label": ${l("title")},
      "photos": photos[]${IMG}
    }`,
  );
}

export type ServiceCard = {
  name: string;
  desc: string;
  href: string;
  image: string;
  imageAlt: string;
};

export function getServiceCards(): Promise<ServiceCard[]> {
  return localeFetch<ServiceCard[]>(
    `*[_type == "service"] | order(order asc) {
      "name": ${l("nav")},
      "desc": coalesce(cardDesc, hero.sub),
      "href": "/ydelser/" + slug.current,
      "image": hero.image${IMG_SRC},
      "imageAlt": ${l("hero.image.alt")}
    }`,
  );
}

// ---------------------------------------------------------------------------
// /galleri
// ---------------------------------------------------------------------------
export type GalleriPageData = {
  metaTitle: string;
  metaDescription: string;
  hero: HeroData;
  seoText: SeoTextData;
  cta: CtaBandData;
  sections: {
    id: string;
    title: string;
    description: string | null;
    cta: Cta | null;
    photos: Img[];
  }[];
};

export function getGalleriPage(): Promise<GalleriPageData> {
  return localeFetch<GalleriPageData>(
    `*[_id == "galleriPage"][0]{
      "metaTitle": ${l("seo.title")},
      "metaDescription": ${l("seo.description")},
      "hero": hero${HERO},
      "seoText": seoText${SEO_TEXT},
      "cta": cta${CTA_BAND},
      "sections": *[_type == "galleryCategory"] | order(order asc) {
        "id": key,
        "title": ${l("title")},
        "description": ${l("description")},
        "cta": cta${CTA},
        "photos": photos[]${IMG}
      }
    }`,
  );
}
