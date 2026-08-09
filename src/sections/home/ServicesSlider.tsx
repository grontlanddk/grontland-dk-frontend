"use client";

import { useRef } from "react";
import Link from "next/link";

import { Container, SafeImage } from "@/components/ui";
import { ArrowIcon, ChevronIcon } from "@/components/icons";
import type { ServiceCard } from "@/lib/sanity/queries";

type Item = ServiceCard;

const CARD = 285;
const GAP = 20;

/* Horizontally-scrollable service cards + prev/next arrows (custom slider,
   no dependency). All 4 fit on desktop; scrolls on narrower viewports. */
export function ServicesSlider({ items }: { items: readonly Item[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * (CARD + GAP), behavior: "smooth" });

  return (
    <>
      <Container>
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-1 py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.name} className="w-[285px] shrink-0 snap-start">
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-line bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(31,61,46,0.12)]"
              >
                <div className="relative h-[218px] shrink-0">
                  <SafeImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="285px"
                  />
                  <span className="absolute bottom-4 right-4 flex size-[56px] items-center justify-center rounded-full bg-pine text-white transition-transform group-hover:scale-105">
                    <ArrowIcon className="h-4 w-[18px]" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px] font-bold uppercase leading-[1.1] text-pine">
                    {item.name}
                  </h3>
                  <p className="mt-3 line-clamp-4 text-[12px] font-light leading-[1.36] text-pine/70">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            aria-label={"Forrige"}
            onClick={() => scroll(-1)}
            className="flex size-[54px] cursor-pointer items-center justify-center rounded-full border border-line bg-white text-pine transition-colors hover:border-pine"
          >
            <ChevronIcon className="rotate-90" />
          </button>
          <button
            type="button"
            aria-label={"Næste"}
            onClick={() => scroll(1)}
            className="flex size-[54px] cursor-pointer items-center justify-center rounded-full bg-leaf text-white transition-colors hover:brightness-110"
          >
            <ChevronIcon className="-rotate-90" />
          </button>
        </div>
      </Container>
    </>
  );
}
