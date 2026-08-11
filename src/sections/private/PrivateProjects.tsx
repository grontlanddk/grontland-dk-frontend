import { ProjectCard } from "@/components/project";
import { Container, Heading, Button } from "@/components/ui";
import { AccentDots, RingDecor } from "@/sections/shared";
import { getProjectsNewestFirst } from "@/lib/sanity/queries";
import { privateCopy } from "@/lib/i18n/copy";

/* Featured private cases — latest 4 private projects from CMS (newest first). */
export async function PrivateProjects() {
  const all = await getProjectsNewestFirst();
  const PRIVATE_PROJECTS = privateCopy().PRIVATE_PROJECTS;
  const projects = all.filter((p) => p.category === "private").slice(0, 4);

  return (
    <section className="relative overflow-x-clip bg-mist py-16 xl:py-24">
      <RingDecor rotate={-130.97} className="bottom-[487px] left-[calc(50%+210px)]" />
      <Container className="relative z-10">
        <div className="flex flex-col gap-10">
          {/* Dots over the CTA row, both right-aligned opposite the heading, and
              the CTAs moved above the grid to match Figma 3067:375. */}
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
            <Heading as="h2" size="section" className="max-w-2xl">
              {PRIVATE_PROJECTS.h2}
            </Heading>

            <div className="flex flex-col gap-6 xl:items-end">
              <AccentDots />
              <div className="flex flex-col gap-3 sm:flex-row">
                {PRIVATE_PROJECTS.ctas.map((cta, i) => (
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
