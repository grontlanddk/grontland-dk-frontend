import { ProjectCard } from "@/components/project";
import { Container, Heading, Button } from "@/components/ui";
import { AccentDots, RingDecor } from "@/sections/shared";
import { getProjectsNewestFirst } from "@/lib/sanity/queries";
import { b2bCopy } from "@/lib/i18n/copy";

/* § 5 — Subcontracting projects. B2B cases first (ARC), then newest other
   projects to fill a row of 4. id="projekter" is the hero anchor. */
export async function B2bProjects() {
  const all = await getProjectsNewestFirst();
  const { B2B_PROJECTS } = b2bCopy();
  const featured = all.filter((p) => p.category === "b2b");
  const rest = all.filter((p) => p.category !== "b2b");
  const projects = [...featured, ...rest].slice(0, 4);

  return (
    <section
      id="projekter"
      className="relative overflow-x-clip scroll-mt-24 bg-white py-16 xl:py-24"
    >
      <RingDecor rotate={-130.97} className="bottom-[541px] left-[calc(50%+210px)]" />
      <Container className="relative z-10">
        <div className="flex flex-col gap-10">
          {/* Dots over the CTA row, both right-aligned opposite the heading, and
              the CTAs moved above the grid to match Figma 3067:375. */}
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
            <div className="max-w-2xl">
              <Heading as="h2" size="section">
                {B2B_PROJECTS.h2}
              </Heading>
              <p className="mt-4 font-light leading-normal text-pine/70 xl:text-[17px]">
                {B2B_PROJECTS.sub}
              </p>
            </div>

            <div className="flex flex-col gap-6 xl:items-end">
              <AccentDots />
              <div className="flex flex-col gap-3 sm:flex-row">
                {B2B_PROJECTS.ctas.map((cta, i) => (
                  <Button
                    key={cta.href}
                    href={cta.href}
                    variant={i === 0 ? "leaf" : "outline"}
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
