
import { Heading, StarChip, SafeImage } from "@/components/ui";
import { omCopy } from "@/lib/i18n/copy";

/* "Hvem er vi?" — mirrored home About (#3023:964): photo with the fact
   StarChips overlaid bleeds to the viewport's LEFT edge on xl; copy column
   right. Seam mirrors About's (50% − 30px), measured from the right.
   Leaf band per client feedback (the dot's green became the section bg;
   dot + text recolored to stay legible). */
export async function OmIntro() {
  const { OM_INTRO } = omCopy();
  return (
    <section className="relative overflow-hidden bg-leaf">
      <div className="mx-auto grid w-full max-w-7xl xl:min-h-[720px] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Left — photo + centered fact chips; absolute on xl to bleed left */}
        <div className="relative min-h-[380px] max-xl:order-last xl:absolute xl:inset-y-0 xl:left-0 xl:right-[calc(50%-30px)] xl:min-h-0">
          <SafeImage
            src={OM_INTRO.image.src}
            alt={OM_INTRO.image.alt}
            fill
            sizes="(min-width: 1280px) 55vw, 100vw"
            className="object-cover"
          />
          <ul className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-8">
            {OM_INTRO.facts.map((fact) => (
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

        {/* Right — copy column in the grid's second column */}
        <div className="flex flex-col justify-center px-6 py-14 xl:col-start-2 xl:max-w-[520px] xl:py-24 xl:pl-16 xl:pr-8">
          <Heading as="h2" size="section" className="text-white">
            {OM_INTRO.h2}
          </Heading>
          <div aria-hidden className="my-6 size-[26px] rounded-full bg-white" />
          <p className="font-light leading-normal text-white/85 xl:text-[17px]">{OM_INTRO.text}</p>
        </div>
      </div>
    </section>
  );
}
