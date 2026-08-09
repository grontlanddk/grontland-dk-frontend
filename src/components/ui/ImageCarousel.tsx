"use client";

import { useEffect, useState } from "react";
import { SafeImage } from "./SafeImage";

import { cn } from "@/util/cn";

export type CarouselImage = { src: string; alt?: string };

const CYCLE_MS = 3500;

const slotClasses = [
  "carousel-right-card",
  "carousel-center-card",
  "carousel-left-card",
] as const;

function getCardClass(idx: number, active: number, total: number): string {
  const slot = (idx - active + total) % total;
  return slot < 3 ? slotClasses[slot] : "carousel-backstack-card";
}

/**
 * Pure-CSS 3-card cycling photo stack (the "photo-scroll" animation the
 * designer referenced from the CO2Lab / Nice sites). ≤3 images animate on a
 * loop; >3 rotate the active window every CYCLE_MS. Zero dependencies.
 */
export function ImageCarousel({
  images,
  variant = "right",
  direction = "horizontal",
  className = "",
  firstPriority = false,
}: {
  images: CarouselImage[];
  variant?: "left" | "right";
  direction?: "horizontal" | "vertical" | "vertical-flip";
  className?: string;
  /** Preload + eager-load the first (front) image — set when the carousel is
      the largest above-the-fold element, e.g. the home hero on mobile where
      Lighthouse picks the front card as LCP. */
  firstPriority?: boolean;
}) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const isExtended = total > 3;
  const isVertical = direction === "vertical" || direction === "vertical-flip";

  useEffect(() => {
    if (total <= 3) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), CYCLE_MS);
    return () => clearInterval(id);
  }, [total]);

  const cards =
    total <= 3
      ? images.slice(0, 3).map((image, idx) => ({ image, className: slotClasses[idx] }))
      : images.map((image, idx) => ({
          image,
          className: getCardClass(idx, active, total),
        }));

  return (
    <div
      className={cn(
        "relative w-full min-w-0 flex-1 overflow-hidden",
        isVertical ? "h-[232px] lg:h-[248px]" : "h-[193px] lg:h-[252px]",
        className,
      )}
    >
      <div
        className={cn(
          "carousel-card-stack h-full w-full",
          isVertical ? "min-h-[232px] lg:min-h-[248px]" : "min-h-[193px] lg:min-h-[252px]",
          isExtended && "carousel-extended",
          direction === "vertical" && "carousel-vertical",
          direction === "vertical-flip" && "carousel-vertical-flip",
          !isVertical && variant === "left" && "carousel-variant-left",
        )}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={cn(
              "carousel-card-item h-full w-full overflow-hidden rounded-[12px] shadow-[inset_0_0_60px_rgba(0,0,0,0.2)]",
              card.className,
            )}
          >
            <SafeImage
              src={card.image.src}
              alt={card.image.alt ?? ""}
              fill
              quality={65}
              priority={firstPriority && idx === 0}
              fetchPriority={firstPriority && idx === 0 ? "high" : undefined}
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 480px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
