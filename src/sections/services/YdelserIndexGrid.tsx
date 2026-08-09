import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { Container, SafeImage } from "@/components/ui";
import type { YdelserIndexData } from "@/lib/sanity/queries";

/* /ydelser card grid — one card per service document (nav, cardDesc with
   hero-sub fallback, hero photo), ordered by the service `order` field. */
export function YdelserIndexGrid({ cards }: { cards: YdelserIndexData["cards"] }) {
  return (
    <section className="bg-mist py-16 xl:py-24">
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <li key={card.slug}>
              <Link
                href={`/ydelser/${card.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <SafeImage
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h2 className="flex items-center justify-between gap-3 text-[15px] font-bold uppercase tracking-[0.3px] text-pine">
                    {card.title}
                    <ArrowIcon className="shrink-0 text-leaf transition-transform duration-200 group-hover:translate-x-1" />
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-pine/60">{card.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
