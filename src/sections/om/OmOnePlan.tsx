
import { Container, Heading, Button, SafeImage } from "@/components/ui";
import { omCopy } from "@/lib/i18n/copy";

/* Contrast band (home OneTeam treatment): full-bleed photo + gradient.
   First CTA anchors to the Process section below (#proces). */
export async function OmOnePlan() {
  const { OM_ONEPLAN } = omCopy();
  return (
    <section className="relative overflow-hidden py-16 text-white xl:py-24">
      <SafeImage
        src={OM_ONEPLAN.background.src}
        alt={OM_ONEPLAN.background.alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(104.68deg,rgba(0,0,0,0.6)_25.04%,rgba(0,0,0,0)_108.03%)]"
      />
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <Heading as="h2" size="section" className="text-white">
            {OM_ONEPLAN.h2}
          </Heading>
          <div aria-hidden className="my-6 size-[26px] rounded-full bg-leaf" />
          <p className="font-light leading-[1.35] text-white/90 xl:text-[18px]">{OM_ONEPLAN.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {OM_ONEPLAN.ctas.map((cta, i) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={i === 0 ? "leaf" : "white"}
                size="md"
                className="w-full sm:w-auto"
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
