"use client";

import { useEffect } from "react";

import { ChevronIcon } from "@/components/icons";
import { cn } from "@/util/cn";

import { Backdrop } from "./Backdrop";
import { wrapIndex } from "./galleryLayout";
import { Modal } from "./Modal";
import type { GalleryItem } from "./types";
import { SafeImage } from "@/components/ui";

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
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pt-12 pb-4">
          <div className="relative h-full w-full">
            <SafeImage
              key={current._key}
              src={current.image.link}
              alt={current.image.alt || ("Galleri billede")}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 930px"
              priority
            />
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute top-[calc(50%-27px)] right-0 left-0 z-30 flex justify-between px-4",
            "lg:left-[calc(50%-492px)] lg:w-[984px]",
          )}
        >
          <button
            type="button"
            aria-label={"Forrige billede"}
            onClick={goPrev}
            className="pointer-events-auto flex size-[54px] cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronIcon className="rotate-90" />
          </button>
          <button
            type="button"
            aria-label={"Næste billede"}
            onClick={goNext}
            className="pointer-events-auto flex size-[54px] cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ChevronIcon className="-rotate-90" />
          </button>
        </div>
      </Modal>
    </>
  );
}
