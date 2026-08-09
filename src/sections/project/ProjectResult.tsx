
import { Container, Heading, SafeImage } from "@/components/ui";
import type { Project } from "@/constants/projects";
import { ui } from "@/lib/i18n/copy";

/* "Resultat" — ~430px write-up on the left; result photo grows to fill the
   remaining width. Ring decor on the photo's bottom-right (home SeoText). */
export async function ProjectResult({ project }: { project: Project }) {
  const t = ui();
  const resultShot = project.gallery.find((g) => g.kind === "result");
  const image = resultShot
    ? { src: resultShot.src, alt: resultShot.alt }
    : { src: project.heroImage, alt: project.heroImageAlt };

  return (
    <section className="overflow-hidden bg-black py-16 text-white xl:py-20">
      <Container>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-[86px]">
          {/* Copy */}
          <div className="flex min-w-0 flex-col gap-6 xl:w-[430px] xl:max-w-[430px] xl:shrink-0">
            <Heading as="h2" size="section" className="text-white">
              {t.projectResultH2}
            </Heading>
            <p className="text-base font-light leading-relaxed text-white/80 xl:text-[18px]">
              {project.result}
            </p>

            {project.focus.length > 0 ? (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.35px] text-leaf">
                  {t.projectFocusH3}
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-white/80 marker:text-leaf">
                  {project.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Photo + ring decor at its bottom-right corner (home SeoText treatment) */}
          <div className="relative w-full xl:min-w-0 xl:flex-1">
            <div className="relative z-10 h-[260px] w-full overflow-hidden rounded-xl xl:h-[380px]">
              <SafeImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 700px, 100vw"
                className="object-cover"
              />
            </div>
            {/* Ring decor tucked behind the photo (z-0), emerging from its
                bottom-right corner onto the band — home SeoText treatment
                (same rotation). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/decor-rings-seo.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-6 z-0 hidden h-[185px] w-[205px] max-w-none origin-center rotate-[-97.15deg] opacity-90 xl:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
