
import { Heading, Button, StarChip, SafeImage } from "@/components/ui";
import { homeCopy } from "@/lib/i18n/copy";

/* About — Figma #3023:964. Mist 2-col: left copy/trades/CTA, right photo with
   four StarChips overlaid (centered). On xl the photo leaves the grid and
   bleeds to the viewport's right edge (like Hero/QuoteCta); the seam stays at
   the centered container's column boundary (50% − 30px). */
export async function About() {
  const ABOUT = homeCopy().ABOUT;
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="mx-auto grid w-full max-w-7xl xl:min-h-[829px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Left — padded like Container inset; ~380px content */}
        <div className="flex flex-col justify-center px-6 py-14 xl:max-w-[428px] xl:py-24 xl:pl-8 xl:pr-8">
          <Heading as="h2" size="section">
            {ABOUT.h2}
          </Heading>
          <div aria-hidden className="my-6 size-[26px] rounded-full bg-leaf" />
          <p className="font-light leading-normal text-pine/75 xl:text-[17px]">{ABOUT.text}</p>

          <div className="mt-10 flex flex-col gap-[10.8px]">
            <h3 className="font-display text-[18px] font-bold uppercase leading-[27px] text-pine">
              {ABOUT.team.h3}
            </h3>
            <p className="text-sm font-light leading-relaxed text-pine/60">{ABOUT.team.text}</p>
            <div className="flex flex-wrap gap-2">
              {ABOUT.team.trades.map((trade) => (
                <span
                  key={trade}
                  className="rounded-full bg-leaf/12 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-moss"
                >
                  {trade}
                </span>
              ))}
            </div>
            <div className="pt-1">
              <Button href={ABOUT.cta.href} variant="pine" className="w-full sm:w-auto">
                {ABOUT.cta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Right — photo + centered fact chips; absolute on xl to bleed right */}
        <div className="relative min-h-[380px] xl:absolute xl:inset-y-0 xl:left-[calc(50%-30px)] xl:right-0 xl:min-h-0">
          <SafeImage
            src={ABOUT.image}
            alt={ABOUT.imageAlt}
            fill
            sizes="(min-width: 1280px) 55vw, 100vw"
            className="object-cover"
          />
          <ul className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-8">
            {ABOUT.facts.map((fact) => (
              <li key={fact.label} className="w-full max-w-[420px]">
                <StarChip
                  text={`${fact.label}: ${fact.value}`}
                  boxVariant="light"
                  starVariant="leaf"
                  textSize="sm"
                  className="w-full border border-line"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
