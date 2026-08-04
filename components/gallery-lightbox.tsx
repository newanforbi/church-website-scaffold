"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery-data";

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openImage = openIndex !== null ? images[openIndex] : null;

  function showPrev() {
    setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }

  function showNext() {
    setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
  }

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
      if (event.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((image, i) => (
          <button
            key={image.slug}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dawn-500"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={i < 8 || image.width !== 206}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            {image.caption && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/80 to-transparent px-3 pb-3 pt-10 text-left text-xs font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100">
                {image.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/95 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 text-3xl leading-none text-white/80 transition hover:text-white"
          >
            &times;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 text-4xl leading-none text-white/70 transition hover:text-white sm:left-6"
          >
            &#8249;
          </button>

          <div
            className="relative max-h-[80vh] w-full max-w-3xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative mx-auto w-full max-h-[70vh]"
              style={{ aspectRatio: `${openImage.width} / ${openImage.height}` }}
            >
              <Image
                src={openImage.src}
                alt={openImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {openImage.caption && (
              <p className="mt-4 text-center text-sm text-white/80">{openImage.caption}</p>
            )}
            <p className="mt-2 text-center text-xs text-white/40">
              {openIndex! + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-2 text-4xl leading-none text-white/70 transition hover:text-white sm:right-6"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
