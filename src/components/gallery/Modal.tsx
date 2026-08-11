"use client";

import type { ReactNode } from "react";

import { cn } from "@/util/cn";

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-0 transition-opacity duration-300 ease-out md:p-4",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      // Closed modal keeps its close button out of the tab order (same
      // aria-hidden-focus rule as the mobile drawer).
      inert={!isOpen}
    >
      <div
        className={cn(
          "relative flex h-dvh w-full max-w-[930px] flex-col overflow-hidden bg-black shadow-md max-h-dvh md:h-[95dvh] md:max-h-[95dvh] md:rounded-xl lg:h-[750px]",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={"Luk"}
          className="absolute top-5 right-4 z-30 flex size-8 cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-70 md:top-5 md:right-5"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
