"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { compressClientImage } from "@/lib/quote/compressClientImage";
import {
  MAX_QUOTE_IMAGES,
  MAX_QUOTE_IMAGE_BYTES,
  MAX_QUOTE_IMAGES_TOTAL_BYTES,
  sniffImageType,
} from "@/lib/quote/images";
import { cn } from "@/util/cn";

const ACCEPT = "image/jpeg,image/jpg,image/png,image/webp";

export function QuoteUploadField({
  files,
  onFilesChange,
  label,
  hint,
  tooMany,
  tooLarge,
  totalTooLarge,
  badType,
  error,
  onError,
}: {
  files: File[];
  onFilesChange: (files: File[]) => void;
  label: string;
  hint: string;
  tooMany: string;
  tooLarge: string;
  totalTooLarge: string;
  badType: string;
  error: string | null;
  onError: (message: string | null) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  async function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list);
    if (incoming.length === 0) return;

    onError(null);
    const next = [...files];
    let message: string | null = null;
    for (const raw of incoming) {
      if (next.length >= MAX_QUOTE_IMAGES) {
        message = tooMany;
        break;
      }
      const compressed = await compressClientImage(raw);
      const bytes = new Uint8Array(await compressed.arrayBuffer());
      const kind = sniffImageType(bytes);
      if (!kind) {
        message = badType;
        continue;
      }
      if (bytes.byteLength > MAX_QUOTE_IMAGE_BYTES) {
        message = tooLarge;
        continue;
      }
      const total = next.reduce((sum, file) => sum + file.size, 0) + bytes.byteLength;
      if (total > MAX_QUOTE_IMAGES_TOTAL_BYTES) {
        message = totalTooLarge;
        break;
      }
      const mime =
        kind === "jpeg" ? "image/jpeg" : kind === "png" ? "image/png" : "image/webp";
      next.push(new File([bytes], compressed.name, { type: mime }));
    }
    onFilesChange(next);
    if (message) onError(message);
  }

  return (
    <div className="sm:col-span-2">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      <label
        className={cn(
          "flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border border-dashed border-moss/40 bg-mist px-4 py-2 text-center text-sm text-pine/50 transition-colors",
          dragOver && "border-leaf bg-leaf/10 text-pine",
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          setDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          void addFiles(event.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          aria-label={label}
          onChange={(event) => {
            void addFiles(event.target.files ?? []);
            event.target.value = "";
          }}
        />
        {files.length === 0 ? (
          hint
        ) : (
          <ul className="flex flex-wrap gap-2 py-1">
            {files.map((file, index) => (
              <PhotoChip
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                onRemove={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onError(null);
                  onFilesChange(files.filter((_, i) => i !== index));
                }}
              />
            ))}
          </ul>
        )}
      </label>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

function PhotoChip({
  file,
  onRemove,
}: {
  file: File;
  onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  return (
    <li className="relative size-12 overflow-hidden rounded-lg border border-line bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="size-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Fjern ${file.name}`}
        className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-bl bg-pine/80 text-[10px] leading-none text-white"
      >
        ×
      </button>
    </li>
  );
}
