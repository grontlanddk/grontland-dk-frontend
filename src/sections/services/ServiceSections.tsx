
import { GalleryCarousel, type GalleryItem } from "@/components/gallery";
import { ProjectCard } from "@/components/project";
import { Button, Container, Heading, SafeImage } from "@/components/ui";
import { ui } from "@/lib/i18n/copy";
import type { ServicePageData } from "@/lib/sanity/queries";
import {
  AccentDots,
  FaqSection,
  FeatureGrid,
  NumberedSteps,
  PageHero,
  PageHeroSeamDecor,
  RingDecor,
} from "@/sections/shared";

/* Section kit for /ydelser/[slug] — thin wrappers over the shared inner-page
   components; section order is fixed by the page route. Data comes from the
   service document (cases + gallery photos embedded by the query). */

export async function ServiceHero({ service }: { service: ServicePageData }) {
  const t = ui();
  return (
    <>
      {/* No eyebrow label — site-wide PageHero pattern (om-os / kontakt). */}
      <PageHero
        title={service.h1}
        sub={service.heroSub}
        ctas={[
          { label: t.getQuote, modal: true },
          { label: t.seeProjects, href: "/projekter", variant: "leaf" },
        ]}
        trustChips={service.trustChips}
        image={service.heroImage}
        decor={<PageHeroSeamDecor />}
      />
    </>
  );
}

export function ServiceScope({ service }: { service: ServicePageData }) {
  return (
    <FeatureGrid
      h2={service.scope.h2}
      items={service.scope.items}
      background="mist"
      columns={3}
      headerAside={<AccentDots />}
      /* Figma 3101:179 — the projects-family ring (-130.97, bbox 380.9x375.8)
         centre-right over the heading and first card row. Bottom-anchored so
         the per-slug/locale heading wrap doesn't drift it (cards are the last
         element, as in B2bScenariosDecor). Behind the cards by convention. */
      decor={<RingDecor rotate={-130.97} className="bottom-[213px] left-[calc(50%+48px)]" />}
    />
  );
}

export async function ServiceProcess({ service }: { service: ServicePageData }) {
  const t = ui();
  return (
    <NumberedSteps
      h2={service.process.h2}
      steps={service.process.steps}
      cta={{ label: t.startMessage }}
      ctaModal
      background="mist"
      backgroundImage={service.processImage ?? undefined}
    />
  );
}

export async function ServiceCases({ service }: { service: ServicePageData }) {
  if (service.cases.length === 0) return null;
  const t = ui();

  return (
    <section className="bg-white py-16 xl:py-24">
      <Container>
        <Heading as="h2" size="section">
          {t.serviceCasesH2}
        </Heading>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {service.cases.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export async function ServiceGalleryStrip({ service }: { service: ServicePageData }) {
  if (service.galleryPhotos.length === 0) return null;
  const t = ui();

  const items: GalleryItem[] = service.galleryPhotos.map((photo) => ({
    _key: photo.src,
    image: { link: photo.src, alt: photo.alt },
  }));

  return (
    <section className="overflow-hidden bg-mist py-16 xl:py-24">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <Heading as="h2" size="section">
          {t.galleryStripH2}
        </Heading>
        <Button href="/galleri" size="md" className="w-full shrink-0 sm:w-auto">
          {t.openGallery}
        </Button>
      </Container>
      <div className="mx-auto mt-10 max-w-[416px] sm:max-w-[726px] md:max-w-[867px] lg:max-w-[1141px] xl:max-w-[1494px]">
        <GalleryCarousel items={items} />
      </div>
    </section>
  );
}

export async function ServiceFaq({ service }: { service: ServicePageData }) {
  return <FaqSection h2={service.faq.h2} items={service.faq.items} />;
}

export function ServiceSeoText({ service }: { service: ServicePageData }) {
  const [primary, secondary] = service.seoText.images ?? [];
  return (
    <section className="overflow-x-clip bg-mist py-16 xl:py-20">
      <Container>
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-16">
          <div className="relative flex w-full shrink-0 flex-col gap-4 xl:w-[460px]">
            {/* Figma 3101:181 — the ring at ~72% scale (bbox 264.6x246.3)
                hugging the second photo's bottom-left, behind the images. The
                column is the anchor (not the section) because xl:items-center
                moves the column with the copy height. Sign via the spout-clock
                protocol: cascade dense along the top, spout ~2 o'clock =
                +65.16 (114.84 put the spout below centre — mirror-adjacent). */}
            {secondary && (
              <RingDecor
                rotate={65.16}
                className="bottom-[5px] left-[-4px] h-[211px] w-[174px]"
              />
            )}
            {primary && (
              <div className="relative z-10 h-[240px] overflow-hidden rounded-xl xl:h-[280px]">
                <SafeImage
                  src={primary.src}
                  alt={primary.alt}
                  fill
                  sizes="(min-width: 1280px) 460px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {secondary && (
              <div className="relative z-10 hidden h-[160px] overflow-hidden rounded-xl sm:block xl:h-[180px] xl:w-[75%] xl:self-end">
                <SafeImage
                  src={secondary.src}
                  alt={secondary.alt}
                  fill
                  sizes="(min-width: 1280px) 345px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <Heading as="h2" size="section">
              {service.seoText.h2}
            </Heading>
            <p className="mt-5 font-light leading-relaxed text-pine/80 xl:text-[17px]">
              {service.seoText.text}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
