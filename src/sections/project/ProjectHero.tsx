import Link from "next/link";
import { Button, Container, Heading, SafeImage } from "@/components/ui";
import { type Project } from "@/constants/projects";
import { projectsCopy } from "@/lib/i18n/copy";

export async function ProjectHero({ project }: { project: Project }) {
  const { PROJECT_CATEGORY_LABEL } = projectsCopy();
  return (
    <section className="bg-mist py-12 xl:py-16">
      <Container>
        <nav
          aria-label="Brødkrumme"
          className="text-sm text-pine/50"
        >
          <Link href="/projekter" className="transition-colors hover:text-leaf">
            Projekter
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-pine">{project.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center md:gap-12 xl:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35px] text-leaf">
              {PROJECT_CATEGORY_LABEL[project.category]}
              <span className="mx-2 text-pine/30" aria-hidden>
                ·
              </span>
              <span className="text-pine/60">{project.objectType}</span>
              <span className="mx-2 text-pine/30" aria-hidden>
                ·
              </span>
              <span className="text-pine/60">{project.location}</span>
            </p>
            <Heading as="h1" size="section" className="mt-3">
              {project.title}
            </Heading>
            <Button
              href={project.serviceHref}
              variant="leaf"
              size="md"
              className="mt-4 w-full sm:w-auto"
            >
              {project.serviceLabel}
            </Button>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-pine/70 xl:text-[18px]">
              {project.intro}
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-leaf">
            <SafeImage
              src={project.heroImage}
              alt={project.heroImageAlt}
              fill
              priority
              fetchPriority="high"
              quality={85}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
