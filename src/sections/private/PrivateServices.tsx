
import { ArrowIcon } from "@/components/icons";
import Link from "next/link";
import { Container, Heading, SafeImage } from "@/components/ui";
import { RingDecor } from "@/sections/shared";
import { getServiceCards } from "@/lib/sanity/queries";
import { privateCopy } from "@/lib/i18n/copy";

/* § 2 — "What can we help you with?" — the 8 service cards from the CMS (same
   source as the home service slider), in a grid for the private page. */
export async function PrivateServices() {
  const cards = await getServiceCards();
  const { PRIVATE_SERVICES } = privateCopy();

  return (
    <section className="relative overflow-x-clip bg-white py-16 xl:py-24">
      {/* Same grid as the b2b services block, so the decor shares its offsets. */}
      <RingDecor rotate={-119.75} className="bottom-[656px] left-[calc(50%+209px)]" />
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <Heading as="h2" size="section">
            {PRIVATE_SERVICES.h2}
          </Heading>
          <p className="mt-4 font-light leading-normal text-pine/70 xl:text-[17px]">
            {PRIVATE_SERVICES.sub}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="flex items-center justify-between gap-2 text-[14px] font-bold uppercase tracking-[0.3px] text-pine">
                    {card.name}
                    <ArrowIcon className="shrink-0 text-leaf transition-transform duration-200 group-hover:translate-x-1" />
                  </h3>
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
