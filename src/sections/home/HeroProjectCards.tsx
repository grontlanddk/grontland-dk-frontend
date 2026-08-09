"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

import Link from "next/link";
import { cn } from "@/util/cn";

// Runs before paint on the client (positions the strip without a visible
// jump); falls back to useEffect during SSR to avoid the hydration warning.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type HeroProjectCard = {
  label: string;
  image: { src: string; alt: string };
  caption: string;
  href: string;
};

/* Glass "PROJEKT" link card overlaid on the hero (thumbnail + label + caption).
   Navigation is suppressed after a drag (see onClickCapture in the strip). */
function ProjectCard({ card }: { card: HeroProjectCard }) {
  return (
    <Link
      href={card.href}
      draggable={false}
      className="glass flex w-[310px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-[18px] bg-white/17 p-2.5 transition-colors hover:bg-white/25"
    >
      <div className="relative h-[107px] w-[98px] shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          className="pointer-events-none object-cover"
          sizes="98px"
          draggable={false}
        />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-[12px] font-bold uppercase leading-tight text-white">
          {card.label}
        </p>
        <p className="mt-1.5 line-clamp-3 text-[11px] font-light leading-snug text-white/85">
          {card.caption}
        </p>
      </div>
    </Link>
  );
}

/**
 * Horizontally scrollable, infinitely looped strip of hero project cards.
 * Touch/trackpad use native overflow scroll; mouse gets click-drag. No buttons.
 * The list is tripled and the scroll position wraps within the middle copy so
 * the loop is seamless in both directions. Zero dependencies.
 */
export function HeroProjectCards({
  cards,
  className = "",
}: {
  cards: readonly HeroProjectCard[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const loop = [...cards, ...cards, ...cards];

  // One copy's width, rounded so the centered start position and the wrap
  // thresholds use the SAME integer — otherwise scrollLeft (browser-rounded)
  // lands just under the fractional threshold and wraps on load = jitter.
  const setW = () => Math.round((ref.current?.scrollWidth ?? 0) / 3);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start in the middle copy so there's room to scroll either way.
    const center = () => {
      el.scrollLeft = setW();
    };
    center();

    // Keep the scroll position inside the middle copy for a seamless loop.
    // Hysteresis (wrap only a hair past the boundary) avoids ping-pong when a
    // gesture leaves scrollLeft sitting exactly on the seam.
    const onScroll = () => {
      const w = setW();
      if (w <= 0) return;
      if (el.scrollLeft < w - 1) {
        el.scrollLeft += w;
        startScroll.current += w;
      } else if (el.scrollLeft > w * 2 + 1) {
        el.scrollLeft -= w;
        startScroll.current -= w;
      }
    };

    const onResize = () => center();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [cards.length]);

  // Mouse click-drag (touch/trackpad already scroll natively).
  // Never preventDefault on pointerdown (that kills child <Link> clicks),
  // and only setPointerCapture after the 6px drag threshold so a plain
  // click reaches the card link.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    dragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (!moved.current && Math.abs(dx) > 6) {
      moved.current = true;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* no active pointer — safe to ignore */
      }
    }
    if (!moved.current) return;
    el.scrollLeft = startScroll.current - dx;
  };

  // Swallow the click that ends a drag so navigation only happens on a
  // genuine (non-drag) click.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      if (ref.current?.hasPointerCapture?.(e.pointerId)) {
        ref.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* pointer may not be captured — safe to ignore */
    }
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      className={cn(
        "no-scrollbar flex gap-4 overflow-x-auto [touch-action:pan-x] select-none cursor-grab active:cursor-grabbing",
        className,
      )}
      aria-label="Udvalgte projekter"
    >
      {/* Copies 2-3 exist only for the seamless loop: aria-hidden takes them
          out of the a11y tree and inert takes their links out of tab order. */}
      {loop.map((card, i) => (
        <div key={i} className="shrink-0" aria-hidden={i >= cards.length} inert={i >= cards.length}>
          <ProjectCard card={card} />
        </div>
      ))}
    </div>
  );
}
