
import { Container, Heading, Button, InfoBox, SafeImage } from "@/components/ui";
import { kontaktCopy } from "@/lib/i18n/copy";

/* Routes visitors who landed on /kontakt first — mirrors the home AUDIENCES
   split. (Projects/gallery proof links removed per client feedback.) */
export async function KontaktAudiences() {
  const { KONTAKT_AUDIENCES } = kontaktCopy();
  return (
    <section className="bg-white py-16 xl:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <Heading as="h2" size="section">
            {KONTAKT_AUDIENCES.h2}
          </Heading>

          <div className="grid gap-3 md:grid-cols-2">
            {KONTAKT_AUDIENCES.cards.map((card, i) => (
              <InfoBox key={card.title} variant="mist" className="flex flex-col overflow-hidden">
                <div className="relative aspect-[21/9]">
                  <SafeImage
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-[16px] font-bold uppercase leading-6 text-pine">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-pine/60">{card.text}</p>
                  <div className="mt-6">
                    <Button
                      href={card.cta.href}
                      variant={i === 0 ? "leaf" : "pine"}
                      // Long EN labels wrapped to 2 lines on mobile; tighter
                      // padding + smaller text keep them on a single line.
                      className="w-full whitespace-nowrap max-sm:!px-3 max-sm:!text-[11px] sm:w-auto"
                    >
                      {card.cta.label}
                    </Button>
                  </div>
                </div>
              </InfoBox>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
