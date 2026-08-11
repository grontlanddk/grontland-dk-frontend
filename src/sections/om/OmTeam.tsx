import Link from "next/link";

import { Container, Heading, InfoBox, SafeImage } from "@/components/ui";
import { omCopy } from "@/lib/i18n/copy";

/* Team leads — facts + portraits from the old site's /team page
   (grontland.dk/assets/team/). */
export async function OmTeam() {
  const { OM_TEAM } = omCopy();
  return (
    <section className="bg-white py-16 xl:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              {OM_TEAM.h2}
            </Heading>
            <p className="mt-4 font-light leading-normal text-pine/70 xl:text-[17px]">{OM_TEAM.intro}</p>
          </div>

          <ul className="grid gap-3 md:grid-cols-3">
            {OM_TEAM.members.map((member) => (
              <li key={member.name} className="h-full">
                <InfoBox variant="light" className="flex h-full flex-col overflow-hidden border border-line">
                  <div className="relative aspect-[4/5]">
                    <SafeImage
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Heading as="h3" size="card">
                      {member.name}
                    </Heading>
                    <p className="mt-2 text-[13px] font-bold uppercase leading-tight text-moss">
                      {member.role}
                    </p>
                    {"note" in member && member.note && (
                      <p className="mt-1 text-sm font-light text-pine/60">{member.note}</p>
                    )}
                    <ul className="mt-4 flex flex-1 flex-col gap-2">
                      {member.trades.map((trade) => (
                        <li key={trade} className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-pine/70">
                          <span aria-hidden className="mt-[7px] size-[7px] shrink-0 rounded-full bg-leaf" />
                          {trade}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={member.link.href}
                      className="mt-5 inline-block text-[12px] font-bold uppercase tracking-[0.3px] text-moss underline underline-offset-4 transition-colors hover:text-leaf"
                    >
                      {member.link.label}
                    </Link>
                  </div>
                </InfoBox>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
