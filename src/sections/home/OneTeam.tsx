
import { Container, Heading, StarChip, SafeImage } from "@/components/ui";
import { homeCopy } from "@/lib/i18n/copy";

/* OneTeam ("Flere fag samlet i én plan") — Figma #1009:1604 (file zq0o0GOkllffjjIomgnQ5p).
   Full-bleed photo + gradient; left intro 340px; right StarChip stack 420px. */
export async function OneTeam() {
  const ONETEAM = homeCopy().ONETEAM;
  return (
    <section className="relative overflow-hidden py-16 text-white xl:min-h-[580px] xl:py-24">
      <SafeImage
        src={ONETEAM.background.src}
        alt={ONETEAM.background.alt}
        fill
        quality={65}
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(104.68deg,rgba(0,0,0,0.6)_25.04%,rgba(0,0,0,0)_108.03%)]"
      />
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 xl:flex-row xl:items-center xl:gap-[440px]">
          <div className="max-w-[340px] shrink-0">
            <Heading as="h2" size="section" className="text-white">
              {ONETEAM.h2}
            </Heading>
            <div aria-hidden className="my-6 size-[26px] rounded-full bg-leaf" />
            <p className="font-light leading-[1.35] text-white/90 xl:text-[18px]">
              {ONETEAM.intro}
            </p>
          </div>
          <ul className="flex w-full flex-col gap-3 xl:w-[420px] xl:shrink-0">
            {ONETEAM.cards.map((card) => (
              <li key={card.title}>
                <StarChip
                  text={`${card.title} — ${card.desc}`}
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
