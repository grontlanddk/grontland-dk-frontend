
import { Container, Heading, Button, Dots, type ButtonVariant, SafeImage } from "@/components/ui";
import { OpenQuoteButton } from "@/components/quote";
import { cn } from "@/util/cn";

export type PageHeroCta = {
  label: string;
  /** Omitted when `modal` is set (the button opens the quote modal instead). */
  href?: string;
  variant?: ButtonVariant;
  /** Opens the quote modal instead of navigating (requires QuoteModalProvider). */
  modal?: boolean;
};

export type PageHeroImage = { src: string; alt: string };

/** Concentric-ring ornament on the copy/photo seam — same placement as /kontakt. */
export function PageHeroSeamDecor() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/svg/decor-leaf.svg"
      alt=""
      aria-hidden
      className="pointer-events-none absolute bottom-4 left-[54%] hidden h-[260px] w-[280px] max-w-none -translate-x-1/2 opacity-90 xl:block"
    />
  );
}

/* Inner-page hero — home Hero baseline: white section, copy column left
   (Dots → label → H1 → bordered sub → CTAs), photo as a right-edge-bleeding
   panel with rounded left corner + legibility gradient on xl; photo block
   below the copy on mobile. */
export function PageHero({
  label,
  title,
  sub,
  ctas = [],
  trustChips = [],
  image,
  decor,
  children,
}: {
  label?: string;
  title: string;
  sub: string;
  ctas?: readonly PageHeroCta[];
  /** Short trust line under the CTAs (e.g. area / reply time / CVR). */
  trustChips?: readonly string[];
  image?: PageHeroImage;
  /** Absolutely-positioned ornament (e.g. ring SVG) — rendered above the
      white bg, below the copy (z-10) and the photo panel (z-20). Pass a
      higher z-index on the node itself when it must sit above the photo. */
  decor?: React.ReactNode;
  /** Extra content in the copy column after CTAs (e.g. gallery filter pills). */
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      {decor}
      {/* Right image panel (desktop) — bleeds to the viewport edge; flush with
          the section top and bottom (feedback on /om-os, applied site-wide). */}
      {image && (
        <div className="absolute inset-y-0 right-0 z-20 hidden w-[43.5%] overflow-hidden rounded-l-[20px] xl:block">
          {/* sizes collapses to 1px below xl — see Hero.tsx for why the
              values must be px-only (vw entries floor the srcset at 384w). */}
          <SafeImage
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            quality={85}
            className="object-cover"
            sizes="(min-width: 1920px) 845px, (min-width: 1280px) 563px, 1px"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(170deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.06)_66%,rgba(0,0,0,0.8)_100%)]"
          />
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-[600px] py-16 xl:py-24">
          <Dots className="mb-5" />
          {label && (
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.3px] text-moss">
              {label}
            </p>
          )}
          {/* hyphens-auto (html lang="da") keeps long Danish compounds from
              overflowing the column or the photo panel on narrow screens. */}
          <Heading as="h1" size="hero" className="mb-8 max-w-[580px] break-words hyphens-auto">
            {title}
          </Heading>
          <p
            className={cn(
              "max-w-[472px] border-l-2 border-pine/50 pl-5 font-light leading-[1.35] text-pine xl:text-[18px]",
              (ctas.length > 0 || children) && "mb-9",
            )}
          >
            {sub}
          </p>
          {ctas.length > 0 && (
            <div className={cn("flex flex-col gap-3 sm:flex-row", (trustChips.length > 0 || children) && "mb-9")}>
              {ctas.map((cta, i) => {
                const variant = cta.variant ?? (i === 0 ? "black" : "leaf");
                const className = cn("w-full sm:w-auto", i === 0 && "sm:min-w-[220px]");
                return cta.modal ? (
                  <OpenQuoteButton key={cta.label} variant={variant} size="md" className={className}>
                    {cta.label}
                  </OpenQuoteButton>
                ) : (
                  <Button key={cta.href} href={cta.href} variant={variant} size="md" className={className}>
                    {cta.label}
                  </Button>
                );
              })}
            </div>
          )}
          {trustChips.length > 0 && (
            <ul className={cn("flex flex-wrap gap-2", children && "mb-9")}>
              {trustChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-leaf/12 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.3px] text-moss"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      </Container>

      {/* Mobile: photo below the copy, like home */}
      {image && (
        <div className="relative mx-4 mb-4 h-[340px] overflow-hidden rounded-[20px] xl:hidden">
          {/* q75: 340px card + gradient overlay hide the q85 difference */}
          <SafeImage src={image.src} alt={image.alt} fill className="object-cover" sizes="100vw" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(170deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.05)_55%,rgba(0,0,0,0.7)_100%)]"
          />
        </div>
      )}
    </section>
  );
}
