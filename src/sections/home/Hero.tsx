
import { Container, Button, Heading, ImageCarousel, SafeImage } from "@/components/ui";
import { OpenQuoteButton } from "@/components/quote";
import { getProjects } from "@/lib/sanity/queries";
import { homeCopy } from "@/lib/i18n/copy";
import { HeroProjectCards, type HeroProjectCard } from "./HeroProjectCards";

/* Hero — left copy column (brand mark → heading → description → CTAs → auto
   slider) + right full-bleed image with glass project cards. Concentric-ring
   decor on the seam. Mark from Figma #3132:72 / #3132:145 (home only). Cards
   are real CMS projects; the desktop strip starts at the content container's
   left edge and runs across the photo panel. */
export async function Hero() {
  const projects = await getProjects();
  const HERO = homeCopy().HERO;
  const cards: HeroProjectCard[] = projects.map((p) => ({
    label: p.title,
    image: { src: p.cardImage, alt: p.cardImageAlt },
    caption: p.cardDesc,
    href: `/projekter/${p.slug}`,
  }));
  return (
    <section className="relative -mt-[72px] overflow-hidden bg-white">
      {/* Right image panel + project cards (desktop) — floats below the header,
          vertically inset; cards are clipped to the panel (overflow-hidden) so
          they stay constrained by the image, left-aligned to the panel edge. */}
      <div className="absolute right-0 top-0 bottom-8 z-20 hidden w-[43.5%] overflow-hidden rounded-l-[20px] xl:block">
        {/* sizes collapses to 1px below xl: this instance is display:none on
            mobile but still downloads (and priority-preloads) — the 1px slot
            makes phones fetch the 16w variant instead. px-only values on
            purpose: any vw entry makes Next floor the srcset at ~384w, so the
            1px trick only works with px (44vw of 1280/1920 ≈ 563/845px). */}
        <SafeImage
          src={HERO.image.src}
          alt={HERO.image.alt}
          fill
          priority
          fetchPriority="high"
          quality={85}
          className="object-cover"
          sizes="(min-width: 1920px) 845px, (min-width: 1280px) 563px, 1px"
        />
        {/* Figma dark gradient — darkens top + bottom for legibility. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.06)_66%,rgba(0,0,0,0.8)_100%)]"
        />
        {/* Looped, drag-scrollable card strip anchored to the panel bottom. */}
        <div className="absolute inset-x-0 bottom-7 z-10">
          <HeroProjectCards cards={cards} className="px-5" />
        </div>
      </div>

      {/* Concentric-ring decoration on the column seam */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/decor-leaf.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[calc(54%+100px)] top-[64%] hidden h-[491px] w-[526px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90 xl:block"
      />

      <Container className="relative z-10">
        <div className="max-w-[600px] pb-16 pt-28 xl:pb-8 xl:pt-28">
          {/* Figma #3132:145 — illustrated mark above H1 (replaces Dots). */}
          <SafeImage
            src="/images/brand/hero-mark.png"
            alt=""
            width={95}
            height={56}
            priority
            className="mb-5"
            aria-hidden
          />
          <Heading as="h1" size="hero" className="mb-8 max-w-[580px]">
            {HERO.h1}
          </Heading>
          <p className="mb-9 max-w-[472px] border-l-2 border-pine/50 pl-5 font-light leading-[1.35] text-pine xl:text-[18px]">
            {HERO.sub}
          </p>
          <div className="mb-12 flex flex-col gap-3 sm:flex-row">
            <OpenQuoteButton variant="black" size="md" className="min-w-[220px]">
              {HERO.ctaPrimary.label}
            </OpenQuoteButton>
            <Button href={HERO.ctaSecondary.href} variant="leaf" size="md">
              {HERO.ctaSecondary.label}
            </Button>
          </div>

          {/* Auto image slider — vertical-flip (bottom→top) overlapping photo
              stack. firstPriority: on mobile the front card is the page's LCP
              (the big hero panel is xl-only), so it must be preloaded, not
              lazy (Lighthouse "LCP request discovery"). */}
          <div className="max-w-[480px]">
            <ImageCarousel images={[...HERO.slider]} direction="vertical-flip" firstPriority />
          </div>
        </div>
      </Container>

      {/* Mobile: image with a single project card below the copy. q75 (not 85):
          the 340px card + gradient overlay hide the difference, and this was
          the page's heaviest image in Lighthouse. */}
      <div className="relative mx-4 mb-4 h-[340px] overflow-hidden rounded-[20px] xl:hidden">
        <SafeImage
          src={HERO.image.src}
          alt={HERO.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.05)_55%,rgba(0,0,0,0.7)_100%)]"
        />
        <div className="absolute inset-x-0 bottom-4">
          <HeroProjectCards cards={cards} className="px-4" />
        </div>
      </div>
    </section>
  );
}
