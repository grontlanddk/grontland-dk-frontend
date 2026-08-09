
import { Container, Heading, Dots, SafeImage } from "@/components/ui";

const FALLBACK_SRC = "/images/galleri/galleri-seo.jpg";
const FALLBACK_ALT = "Grønt Land DK medarbejder på en haveopgave";

/* Gallery SEO band — Figma #3053:107. Mist section: left-bleed photo, right
   H2 → Dots → body. Prefers CMS seoText.images[0]; falls back to Figma export. */
export function GalleriSeoText({
  h2,
  text,
  image,
}: {
  h2: string;
  text: string;
  image?: { src: string; alt: string } | null;
}) {
  const photo = image?.src ? image : { src: FALLBACK_SRC, alt: FALLBACK_ALT };

  return (
    <section className="relative overflow-hidden bg-mist">
      {/* Left photo — flush to viewport edge; mild vertical bleed clipped by section. */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] xl:absolute xl:inset-y-0 xl:left-0 xl:h-auto xl:w-[min(44vw,629px)]">
        <SafeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 629px, 100vw"
          className="object-cover xl:object-[center_35%]"
        />
      </div>

      <Container className="relative z-10 py-14 xl:py-20">
        <div className="flex flex-col xl:min-h-[420px] xl:flex-row xl:items-center xl:justify-end">
          <div className="flex max-w-[614px] flex-col gap-5 xl:w-[614px]">
            <Heading as="h2" size="section">
              {h2}
            </Heading>
            <Dots />
            <p className="font-light leading-normal text-pine/70 xl:text-[18px] xl:leading-[27px]">
              {text}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
