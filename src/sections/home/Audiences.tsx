
import { Container, Button, StarChip, Heading, SafeImage } from "@/components/ui";
import { homeCopy } from "@/lib/i18n/copy";

/* Figma image fill crop inside a fixed frame (#1009:1547, #1009:1596). */
function FigmaCroppedPhoto({
  src,
  alt,
  width,
  height,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes: string;
}) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={`absolute left-0 top-[-59.8%] h-[219.61%] w-full max-w-none ${className ?? ""}`}
    />
  );
}

/* Audiences ("Hvem hjælper vi?") — Figma #1009:1517 (file zq0o0GOkllffjjIomgnQ5p).
   Header #1009:1518 + decor #1009:1521; private #1009:1544; B2B #1009:1562 + decor #1009:1564. */
export async function Audiences() {
  const AUDIENCES = homeCopy().AUDIENCES;
  return (
    <section className="isolate">
      {/* Header band — Figma #1009:1518; decor #1009:1521 behind mist, bleeds into leaf band */}
      <div className="relative z-0 overflow-visible">
        {/* Ring decor #1009:1521 — explicit box (426×400 per the correct Firefox
            render): 4-side percentage insets + rotate on an <img> are resolved
            differently by Chrome (over-constrained replaced element), which
            blew the decor up. Anchor left/top only, fixed size. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/decor-rings-audiences-header.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-10 left-[41.51%] top-0 hidden h-[400px] w-[427px] max-w-none rotate-[-116.47deg] opacity-90 xl:block"
        />
        <div className="relative bg-mist py-14 xl:py-20">
          <Container>
            <Heading as="h2" size="section">
              {AUDIENCES.h2}
            </Heading>
          </Container>
        </div>
      </div>

      {AUDIENCES.cards.map((card) => {
        const isB2B = card.dark;

        if (!isB2B) {
          return (
            <div
              key={card.title}
              className="relative z-20 overflow-hidden bg-leaf py-12 text-white xl:py-[90px]"
            >
              <Container className="relative z-10">
                {/* Private row — Figma #1009:1545: 1200×340, gap 172, items-center.
                    No extra px here — the Container already pads x by 24 (px-6);
                    a second px-6 made the private band inset wider than B2B. */}
                <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 xl:flex-row xl:gap-[172px]">
                  <div className="relative z-10 h-[260px] w-full shrink-0 xl:h-[340px] xl:w-[584px]">
                    {/* Photo clip #1009:1547 — 697×340 frame, -24px left bleed */}
                    <div className="absolute -left-6 top-0 h-full overflow-hidden rounded-r-xl max-xl:relative max-xl:left-0 max-xl:w-full max-xl:rounded-xl xl:left-[-24px] xl:h-[340px] xl:w-[697px]">
                      <FigmaCroppedPhoto
                        src={card.image}
                        alt={card.imageAlt}
                        width={697}
                        height={340}
                        sizes="(max-width: 1280px) 100vw, 697px"
                      />
                    </div>
                    <StarChip
                      text={card.title}
                      boxVariant="light"
                      starVariant="leaf"
                      className="absolute -bottom-5 left-6 right-6 z-10 shadow-lg xl:left-[24px] xl:right-auto xl:w-[360px]"
                      textSize="sm"
                    />
                  </div>
                  <div className="relative z-10 w-full max-w-[420px] shrink-0">
                    <Heading as="h3" size="card" className="mb-4 text-white">
                      {card.title}
                    </Heading>
                    <p className="mb-8 font-light leading-[1.35] text-white/80 xl:text-[16px]">
                      {card.text}
                    </p>
                    <Button href={card.cta.href} variant="white" className="w-full sm:w-auto">
                      {card.cta.label}
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          );
        }

        return (
          <div
            key={card.title}
            className="relative z-10 overflow-hidden py-12 text-white xl:py-[90px]"
          >
            <div className="absolute inset-0 z-0 bg-black" aria-hidden />
            <Container>
              {/* B2B band — Figma #1009:1563: 1280×340 wrapper; decor #1009:1564 sibling of row.
                  Height fixed only at xl (decor alignment); auto on mobile/tablet so the
                  stacked content isn't clipped by the parent's overflow-hidden. */}
              <div className="relative isolate mx-auto w-full max-w-[1280px] xl:h-[340px]">
                {/* B2B ring decor — z-0 inside wrapper (not -z-10 behind band bg) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/svg/decor-rings-audiences-b2b.svg"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-[27.65%_42.49%_-29.33%_28.59%] z-0 hidden max-w-none opacity-90 xl:block"
                />
                {/* Content row #1009:1587: 1200×340, gap 107, items-center */}
                <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-10 xl:flex-row xl:gap-[107px]">
                  <div className="w-full min-w-0 shrink-0 xl:min-w-[420px] xl:max-w-[420px]">
                    <Heading as="h3" size="card" className="mb-4 text-white">
                      {card.title}
                    </Heading>
                    <p className="mb-8 font-light leading-[1.35] text-white/80 xl:text-[16px]">
                      {card.text}
                    </p>
                    <Button href={card.cta.href} variant="leaf" className="w-full sm:w-auto">
                      {card.cta.label}
                    </Button>
                  </div>
                  <div className="relative w-full shrink-0 xl:w-[673px]">
                    {/* Photo clip #1009:1596 — 673×340 */}
                    <div className="relative h-[260px] w-full overflow-hidden rounded-xl xl:h-[340px]">
                      <FigmaCroppedPhoto
                        src={card.image}
                        alt={card.imageAlt}
                        width={673}
                        height={340}
                        sizes="(max-width: 1280px) 100vw, 673px"
                      />
                    </div>
                    <StarChip
                      text={card.title}
                      boxVariant="light"
                      starVariant="black"
                      className="absolute -bottom-5 left-6 right-6 z-10 shadow-lg xl:left-6 xl:right-auto xl:w-[360px]"
                      textSize="sm"
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        );
      })}
    </section>
  );
}
