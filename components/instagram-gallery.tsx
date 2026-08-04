"use client";

import { useCallback, useState } from "react";
import type { InstagramMedia } from "@/lib/instagram";

export function InstagramGallery({
  initialMedia,
  initialCursor,
  profileUrl,
  handle,
}: {
  initialMedia: InstagramMedia[];
  initialCursor?: string;
  profileUrl: string;
  handle: string;
}) {
  const [media, setMedia] = useState(initialMedia);
  const [cursor, setCursor] = useState<string | undefined>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<InstagramMedia | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (!cursor || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/instagram?after=${encodeURIComponent(cursor)}`);
      if (!res.ok) throw new Error("Could not load more photos");
      const data = (await res.json()) as {
        media: InstagramMedia[];
        nextCursor?: string;
      };
      setMedia((prev) => {
        const seen = new Set(prev.map((item) => item.id));
        return [...prev, ...data.media.filter((item) => !seen.has(item.id))];
      });
      setCursor(data.nextCursor);
    } catch {
      setError("Could not load more photos. Try again shortly.");
    } finally {
      setLoading(false);
    }
  }, [cursor, loading]);

  if (media.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {media.map((item) => {
          const preview =
            item.mediaType === "VIDEO" ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative aspect-square overflow-hidden bg-brand-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dawn-500"
            >
              {/* Instagram CDN URLs expire; plain img avoids next/image host churn. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={item.caption?.slice(0, 120) || `Instagram post by @${handle}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {item.mediaType === "VIDEO" && (
                <span className="absolute right-2 top-2 rounded bg-brand-950/70 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                  Video
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 bg-brand-950/0 transition group-hover:bg-brand-950/25" />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3 px-4 py-10">
        {error && <p className="text-sm text-red-700">{error}</p>}
        {cursor ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="btn-primary min-w-[12rem] disabled:opacity-60"
          >
            {loading ? "Loading…" : "Load more photos"}
          </button>
        ) : (
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline"
          >
            See more on Instagram
          </a>
        )}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Instagram photo"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/95 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 text-3xl leading-none text-white/80 hover:text-white"
          >
            &times;
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.mediaType === "VIDEO" ? (
              <video
                src={active.mediaUrl}
                controls
                className="max-h-[70vh] w-full bg-black object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.mediaUrl}
                alt={active.caption || `Instagram post by @${handle}`}
                className="max-h-[70vh] w-full object-contain"
              />
            )}
            {active.caption && (
              <p className="mt-4 line-clamp-4 text-center text-sm text-white/80">
                {active.caption}
              </p>
            )}
            <p className="mt-3 text-center">
              <a
                href={active.permalink}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-dawn-400 underline decoration-dawn-400/40 underline-offset-2 hover:text-dawn-300"
              >
                View on Instagram &rarr;
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
