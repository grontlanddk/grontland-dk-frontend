
import Link from "next/link";
import { Container, Heading, Button, SafeImage } from "@/components/ui";
import { OpenQuoteButton } from "@/components/quote";
import { getSiteSettings } from "@/lib/sanity/queries";
import { ui } from "@/lib/i18n/copy";

/* Final CTA band for inner pages — black (contrasts the pine footer, like
   ProjectCta). Primary button + phone (from CMS siteSettings) + optional
   crosslinks row. Optional photo bleeds to the right viewport edge (home
   QuoteCta treatment); on mobile it sits below the copy as a rounded panel. */
export async function CtaBand({
  h2,
  text,
  primary,
  primaryModal = false,
  crosslinks = [],
  image,
  textMaxWidth = "max-w-2xl",
}: {
  h2: string;
  text: string;
  primary: { label: string; href?: string };
  /** Primary button opens the quote modal instead of navigating (requires QuoteModalProvider). */
  primaryModal?: boolean;
  crosslinks?: readonly { label: string; href: string }[];
  image?: { src: string; alt: string };
  /** Tailwind max-width for the copy column. Narrow it (e.g. "max-w-[540px]")
   *  when a wide photo shares the band so the text keeps clear of it. */
  textMaxWidth?: string;
}) {
  const s = await getSiteSettings();
  const phone = { label: `${ui().callPrefix} ${s.phone}`, href: s.phoneHref };
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {image && (
        <div className="absolute bottom-0 right-0 top-0 z-0 hidden w-[42%] overflow-hidden rounded-l-[20px] xl:block">
          <SafeImage src={image.src} alt={image.alt} fill sizes="45vw" className="object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]"
          />
        </div>
      )}
      <Container className="relative z-10 py-16 md:py-20">
        <div className={textMaxWidth}>
          <Heading as="h2" size="section" className="text-white">
            {h2}
          </Heading>
          <p className="mt-5 text-base font-light leading-relaxed text-white/70 xl:text-[17px]">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryModal ? (
              <OpenQuoteButton variant="leaf" size="md" className="w-full sm:w-auto">
                {primary.label}
              </OpenQuoteButton>
            ) : (
              <Button href={primary.href} variant="leaf" size="md" className="w-full sm:w-auto">
                {primary.label}
              </Button>
            )}
            <Button href={phone.href} variant="white" size="md" className="w-full sm:w-auto">
              {phone.label}
            </Button>
          </div>
          {crosslinks.length > 0 && (
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {crosslinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] font-bold uppercase tracking-[0.3px] text-white/70 underline underline-offset-4 transition-colors hover:text-leaf"
                >
                  {link.label}
                </Link>
              ))}
            </p>
          )}
        </div>
        {image && (
          <div className="relative mt-10 h-[220px] overflow-hidden rounded-xl xl:hidden">
            <SafeImage src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          </div>
        )}
      </Container>
    </section>
  );
}
