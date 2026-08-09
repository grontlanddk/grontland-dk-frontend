"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { ChevronIcon } from "@/components/icons";
import { cn } from "@/util/cn";

import { readGalleryMetrics, shortestLoopDistance } from "./galleryLayout";
import type { GalleryItem } from "./types";
import { SafeImage } from "@/components/ui";

function CoverflowSlide({
  item,
  index,
  distance,
  sideScale,
  overlapStride,
  onSlideClick,
}: {
  item: GalleryItem;
  index: number;
  distance: number;
  sideScale: number;
  overlapStride: number;
  onSlideClick: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const absDistance = Math.abs(distance);
  const isActive = distance === 0;
  const scale = isActive ? 1 : sideScale;
  const zIndex = 30 - absDistance * 10;
  const opacity = absDistance >= 2 ? 0.6 : 1;
  const x = distance * overlapStride;

  return (
    <div
      className={cn("gallery-coverflow-slide", isActive && "cursor-pointer")}
      style={{
        transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
        zIndex,
        opacity,
      }}
      onClick={isActive ? onSlideClick : undefined}
      role={isActive ? "button" : undefined}
      tabIndex={isActive ? 0 : undefined}
      onKeyDown={
        isActive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSlideClick();
              }
            }
          : undefined
      }
      aria-label={isActive ? `${"Åbn billede"}: ${item.image.alt}` : undefined}
    >
      {failed ? (
        <div className="h-full w-full rounded-[14px] bg-white ring-1 ring-inset ring-line" aria-hidden />
      ) : (
        <SafeImage
          src={item.image.link}
          alt={item.image.alt || `Galleri billede ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 727px, 90vw"
          quality={85}
          className="rounded-[14px] object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function CoverflowCarousel({
  items,
  activeIndex,
  onActiveIndexChange,
  onSlideClick,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSlideClick: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [metrics, setMetrics] = useState({
    sideScale: 0.94,
    overlapStride: 232 * 0.52,
  });

  const total = items.length;

  const updateLayout = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const next = readGalleryMetrics(root);
    setMetrics({ sideScale: next.sideScale, overlapStride: next.overlapStride });
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    updateLayout();
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(root);
    return () => observer.disconnect();
  }, [updateLayout]);

  if (!total) return null;

  const { sideScale, overlapStride } = metrics;

  const goPrev = () => onActiveIndexChange((activeIndex - 1 + total) % total);
  const goNext = () => onActiveIndexChange((activeIndex + 1) % total);

  return (
    <div
      ref={rootRef}
      className={cn(
        "gallery-coverflow relative overflow-hidden transition-opacity duration-200",
        ready ? "opacity-100" : "opacity-0",
      )}
      style={{ height: "var(--gallery-slide-h)" }}
    >
      <div className="gallery-coverflow-stage">
        {items.map((item, i) => {
          const distance = shortestLoopDistance(i, activeIndex, total);
          if (Math.abs(distance) > 2) return null;

          return (
            <CoverflowSlide
              key={item._key}
              item={item}
              index={i}
              distance={distance}
              sideScale={sideScale}
              overlapStride={overlapStride}
              onSlideClick={onSlideClick}
            />
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-1/2 z-40 flex -translate-y-1/2 justify-between sm:inset-x-8 lg:inset-x-12">
        <button
          type="button"
          aria-label={"Forrige billede"}
          onClick={goPrev}
          className="pointer-events-auto flex size-[54px] cursor-pointer items-center justify-center rounded-full border border-line bg-white text-pine transition-colors hover:border-pine"
        >
          <ChevronIcon className="rotate-90" />
        </button>
        <button
          type="button"
          aria-label={"Næste billede"}
          onClick={goNext}
          className="pointer-events-auto flex size-[54px] cursor-pointer items-center justify-center rounded-full bg-leaf text-white transition-colors hover:brightness-110"
        >
          <ChevronIcon className="-rotate-90" />
        </button>
      </div>
    </div>
  );
}
