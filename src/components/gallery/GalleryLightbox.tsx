"use client";

import { useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: item.image.link,
        alt: item.image.alt || "Galleri billede",
      })),
    [items],
  );

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={activeIndex}
      slides={slides}
      on={{
        view: ({ index }) => {
          if (index !== activeIndex) onActiveIndexChange(index);
        },
      }}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ imageFit: "contain" }}
      labels={{
        Next: "Næste billede",
        Previous: "Forrige billede",
        Close: "Luk",
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
      }}
    />
  );
}
