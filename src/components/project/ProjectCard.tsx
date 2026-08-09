"use client";

import Link from "next/link";
import { StarChip, SafeImage } from "@/components/ui";
import { type Project } from "@/constants/projects";
import { projectsCopy } from "@/lib/i18n/copy";

/** Shared project card — home, listing, and related strip. Category shows only in the StarChip strip. */
export function ProjectCard({ project }: { project: Project }) {
  const { PROJECTS_LIST } = projectsCopy();
  return (
    <Link href={`/projekter/${project.slug}`} className="group block">
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-leaf">
          <SafeImage
            src={project.cardImage}
            alt={project.cardImageAlt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="rounded-xl object-cover"
          />
        </div>
        <StarChip
          text={project.serviceLabel}
          boxVariant="light"
          starVariant="leaf"
          textSize="sm"
          className="absolute -bottom-1 -left-1 w-[calc(100%+8px)] !py-3 shadow-md"
        />
      </div>
      <h3 className="mt-8 text-[16px] font-bold uppercase leading-6 text-pine">
        {project.title}
      </h3>
      <p className="mt-2 text-sm font-light leading-relaxed text-pine/60">
        {project.cardDesc}
      </p>
      <span className="mt-3 inline-block text-[12px] font-bold uppercase tracking-[0.3px] text-moss underline underline-offset-4">
        {PROJECTS_LIST.linkLabel}
      </span>
    </Link>
  );
}
