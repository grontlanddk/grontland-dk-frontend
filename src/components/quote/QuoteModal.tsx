"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function QuoteModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const label = "Få et tilbud på dit projekt";
  const closeLabel = "Luk";
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      const firstField = panelRef.current?.querySelector<HTMLElement>(
        "input:not([type='radio']), select, textarea",
      );
      firstField?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[687px] overflow-y-auto overscroll-contain rounded-[24px] bg-white p-5 text-pine shadow-md sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-4 top-4 z-10 flex size-8 cursor-pointer items-center justify-center text-pine transition-opacity hover:opacity-70 sm:right-5 sm:top-5"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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

