
import { Container, Heading, SafeImage } from "@/components/ui";
import { homeCopy } from "@/lib/i18n/copy";

/* SeoText — Figma #3023:1016. Black band: left garden photo, ring decor mid,
   right white H2 + body. Short natural SEO block before FAQ. */
export async function SeoText() {
  const SEOTEXT = homeCopy().SEOTEXT;
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <Container className="relative z-10 py-14 xl:py-[91px]">
        {/* Ring decor #3023:1021 — clipped by section overflow-hidden (rotated paint bleeds) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[291px] z-0 hidden h-[277px] w-[322px] xl:block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/decor-rings-seo.svg"
            alt=""
            className="size-full max-w-none origin-center rotate-[-97.15deg] opacity-90"
          />
        </div>

        <div className="relative isolate mx-auto w-full max-w-[1200px] xl:h-[339px]">
          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-[86px]">
            {/* Photo #3023:1044 */}
            <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-xl xl:h-[339px] xl:w-[538px]">
              <SafeImage
                src={SEOTEXT.image}
                alt={SEOTEXT.imageAlt}
                fill
                sizes="(min-width: 1280px) 538px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Copy #3023:1017 */}
            <div className="flex min-w-0 flex-col gap-6 xl:max-w-[485px]">
              <Heading as="h2" size="card" className="text-white">
                {SEOTEXT.h2}
              </Heading>
              <p className="text-sm font-light leading-[22.75px] text-white">{SEOTEXT.text}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
