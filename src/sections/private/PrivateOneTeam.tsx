import { Container, Heading, StarChip, SafeImage } from "@/components/ui";
import { privateCopy } from "@/lib/i18n/copy";

/* § 4 — "One team instead of several separate contractors" — the client's
   problem stated first, then the Grønt Land DK solution as a bullet grid.
   Same full-bleed photo + gradient + white-text treatment as the home
   OneTeam block. Kept at two columns: six items in a single column would run
   ~1.6x the intro height (the four-item home block balances at 1.05); the
   2-col grid matches that balance almost exactly. */
export async function PrivateOneTeam() {
  const { PRIVATE_ONE_TEAM } = privateCopy();

  return (
    <section className="relative overflow-hidden py-16 text-white xl:min-h-[580px] xl:py-24">
      <SafeImage
        src={PRIVATE_ONE_TEAM.background.src}
        alt={PRIVATE_ONE_TEAM.background.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(104.68deg,rgba(0,0,0,0.6)_25.04%,rgba(0,0,0,0)_108.03%)]"
      />
      <Container className="relative z-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:gap-16">
          <div className="xl:max-w-[420px]">
            <Heading as="h2" size="section" className="text-white">
              {PRIVATE_ONE_TEAM.h2}
            </Heading>
            <p className="mt-6 font-light leading-relaxed text-white/90 xl:text-[17px]">
              {PRIVATE_ONE_TEAM.problem}
            </p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.3px] text-leaf">
              {PRIVATE_ONE_TEAM.intro}
            </p>
          </div>

          <ul className="grid flex-1 gap-3 sm:grid-cols-2">
            {PRIVATE_ONE_TEAM.items.map((item) => (
              <li key={item.title}>
                <StarChip
                  text={`${item.title} — ${item.desc}`}
                  boxVariant="light"
                  starVariant="leaf"
                  textSize="sm"
                  className="h-full border border-line"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
