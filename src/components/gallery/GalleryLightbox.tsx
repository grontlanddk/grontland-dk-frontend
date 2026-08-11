"use client";

import { useEffect } from "react";

import { ChevronIcon } from "@/components/icons";
import { SafeImage } from "@/components/ui";
import { cn } from "@/util/cn";

import { Backdrop } from "./Backdrop";
import { wrapIndex } from "./galleryLayout";
import { Modal } from "./Modal";
import type { GalleryItem } from "./types";

export function GalleryLightbox({
  items,
  isOpen,
  activeIndex,
  onActiveIndexChange,
  onClose,
}: {
  items: GalleryItem[];
  isOpen: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = items.length;
  const current = items[activeIndex];

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("no-doc-scroll");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onActiveIndexChange(wrapIndex(activeIndex - 1, total));
      } else if (event.key === "ArrowRight") {
        onActiveIndexChange(wrapIndex(activeIndex + 1, total));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-doc-scroll");
    };
  }, [isOpen, activeIndex, total, onActiveIndexChange]);

  if (!isOpen || !current) return null;

  const goPrev = () => onActiveIndexChange(wrapIndex(activeIndex - 1, total));
  const goNext = () => onActiveIndexChange(wrapIndex(activeIndex + 1, total));

  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose} />
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* Viewport-stretch stage (nbyg GalleryModal): fill modal height, contain
            the photo, keep side lanes clear so prev/next sit fully visible. */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <div className="relative h-full w-full max-h-full px-14 pt-10 pb-6 sm:px-16 md:pt-12 md:pb-8">
            <div className="relative h-full w-full">
              <SafeImage
                key={current._key}
                src={current.image.link}
                alt={current.image.alt || "Galleri billede"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 930px"
                priority
              />
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between px-3 sm:px-4",
            )}
          >
            <button
              type="button"
              aria-label="Forrige billede"
              onClick={goPrev}
              className="pointer-events-auto flex size-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
            >
              <ChevronIcon className="rotate-90" />
            </button>
            <button
              type="button"
              aria-label="Næste billede"
              onClick={goNext}
              className="pointer-events-auto flex size-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
            >
              <ChevronIcon className="-rotate-90" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
