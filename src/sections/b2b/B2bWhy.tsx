
import { Container, Heading, StarChip, SafeImage } from "@/components/ui";
import { b2bCopy } from "@/lib/i18n/copy";

/* § 4 — Capabilities & responsibility. Contrast band (pine): the reliable-capacity
   argument, six proof chips, and a work photo. The team itself is the OmTeam
   block that follows this section. */
export async function B2bWhy() {
  const { B2B_WHY } = b2bCopy();
  return (
    <section className="bg-pine py-16 text-white xl:py-24">
      <Container>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-24">
          <div className="shrink-0 xl:max-w-[560px]">
            <Heading as="h2" size="section" className="break-words hyphens-auto text-white">
              {B2B_WHY.h2}
            </Heading>
            <div aria-hidden className="my-6 size-[26px] rounded-full bg-leaf" />
            <p className="font-light leading-[1.35] text-white/90 xl:text-[18px]">{B2B_WHY.intro}</p>

            {/* Work photo in place of the old compact trade-leads line — the
                full team block (OmTeam) now follows this section, so the
                "meet the team" link here was redundant. Sits in the same
                divider wrapper the leads list used, at the column's 560px
                width. */}
            <div className="mt-8 border-t border-white/15 pt-6">
              <div className="relative aspect-[560/288] w-full overflow-hidden rounded-[16px]">
                <SafeImage
                  src={B2B_WHY.image.src}
                  alt={B2B_WHY.image.alt}
                  fill
                  sizes="(min-width: 1280px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <ul className="flex w-full flex-col gap-3">
            {B2B_WHY.items.map((item) => (
              <li key={item.title}>
                <StarChip
                  text={`${item.title} — ${item.desc}`}
                  boxVariant="light"
                  starVariant="leaf"
                  textSize="sm"
                  className="border border-line"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
