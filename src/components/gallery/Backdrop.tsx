"use client";

import { useEffect } from "react";

import { cn } from "@/util/cn";

export function Backdrop({
  isOpen,
  onClose,
  className = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        // Above sticky Header (z-50); Modal sits at z-[110].
        "fixed inset-0 z-[100] h-dvh w-dvw bg-black/60 transition-opacity duration-300 ease-in-out",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
      onClick={onClose}
      aria-hidden={!isOpen}
    />
  );
}
