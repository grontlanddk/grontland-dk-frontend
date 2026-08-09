
import Link from "next/link";
import { Container, Heading, InfoBox, SafeImage } from "@/components/ui";
import { QuoteModalForm } from "@/components/quote";
import { kontaktCopy } from "@/lib/i18n/copy";

/* Full-page quote form + direct-contact column. The form reuses the shared
   QuoteModalForm (same fields as the modal — one source of copy/markup). */
export async function KontaktForm() {
  const { KONTAKT_FORM, KONTAKT_INFO } = kontaktCopy();
  return (
    <section className="bg-white py-16 xl:py-24">
      <Container>
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-16">
          <div>
            <Heading as="h2" size="section">
              {KONTAKT_FORM.h2}
            </Heading>
            <InfoBox variant="mist" className="mt-8 p-6 sm:p-8">
              <QuoteModalForm />
            </InfoBox>
          </div>

          <div className="flex flex-col">
            <Heading as="h2" size="card">
              {KONTAKT_INFO.h2}
            </Heading>
            <ul className="mt-8 flex flex-col gap-3">
              {KONTAKT_INFO.items.map((item) => (
                <li key={item.label}>
                  <InfoBox variant="light" className="border border-line px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-moss">{item.label}</p>
                    {"href" in item && item.href ? (
                      <Link
                        href={item.href}
                        className="mt-1 block text-[16px] font-semibold text-pine transition-colors hover:text-leaf"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="mt-1 text-[16px] font-semibold text-pine">{item.value}</p>
                    )}
                    {"hint" in item && item.hint && (
                      <p className="mt-1 text-sm font-light text-pine/60">{item.hint}</p>
                    )}
                  </InfoBox>
                </li>
              ))}
            </ul>
            {/* Fills the column gap under the cards — Figma #3049:154. */}
            <div className="relative mt-3 min-h-[220px] flex-1 overflow-hidden rounded-2xl">
              <SafeImage
                src={KONTAKT_INFO.image.src}
                alt={KONTAKT_INFO.image.alt}
                fill
                sizes="(min-width: 1280px) 400px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
