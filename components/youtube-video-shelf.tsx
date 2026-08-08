"use client";

import Image from "next/image";
import { useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";
import { formatVideoDate, getVideoEmbedUrl } from "@/lib/youtube";

export function YouTubeVideoShelf({
  videos,
  title,
  emptyLabel = "No videos available right now.",
}: {
  videos: YouTubeVideo[];
  title: string;
  emptyLabel?: string;
}) {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? null);
  const active = videos.find((video) => video.id === activeId) ?? videos[0] ?? null;

  if (!active) {
    return <p className="text-center text-sm text-brand-600">{emptyLabel}</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
          <iframe
            key={active.id}
            src={getVideoEmbedUrl(active.id)}
            title={active.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Now Playing
          </p>
          <h3 className="mt-2 font-serif text-xl font-semibold text-brand-950 sm:text-2xl">
            {active.title}
          </h3>
          {formatVideoDate(active) && (
            <p className="mt-1 text-sm text-brand-600">{formatVideoDate(active)}</p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-600">
          {title}
        </p>
        <ul className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
          {videos.map((video) => {
            const isActive = video.id === active.id;
            return (
              <li key={video.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  className={`flex w-full gap-3 rounded-lg p-2 text-left transition ${
                    isActive ? "bg-brand-100 ring-1 ring-gold-500/40" : "hover:bg-brand-100/70"
                  }`}
                >
                  <span className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md bg-brand-200">
                    <Image
                      src={video.thumbnailUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="7rem"
                    />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`line-clamp-2 text-sm font-medium ${
                        isActive ? "text-brand-950" : "text-brand-800"
                      }`}
                    >
                      {video.title}
                    </span>
                    {formatVideoDate(video) && (
                      <span className="mt-1 block text-xs text-brand-600">
                        {formatVideoDate(video)}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
