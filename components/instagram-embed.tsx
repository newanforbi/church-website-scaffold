"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

function loadInstagramScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.instgrm?.Embeds) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://www.instagram.com/embed.js"]',
  );
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      if (window.instgrm?.Embeds) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Instagram embed.js"));
    document.body.appendChild(script);
  });
}

export function InstagramEmbed({
  html,
  fullBleed = false,
}: {
  html: string;
  fullBleed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    async function process() {
      try {
        await loadInstagramScript();
        if (cancelled) return;
        window.instgrm?.Embeds.process();

        if (fullBleed && ref.current) {
          const expand = () => {
            const root = ref.current;
            if (!root) return;
            const iframe = root.querySelector("iframe");
            const blockquote = root.querySelector("blockquote");
            if (blockquote) {
              blockquote.style.maxWidth = "100%";
              blockquote.style.minWidth = "0";
              blockquote.style.width = "100%";
              blockquote.style.margin = "0";
            }
            if (iframe) {
              iframe.style.width = "100%";
              iframe.style.maxWidth = "100%";
              iframe.style.minHeight = "min(1600px, 220vh)";
              iframe.style.height = "min(1600px, 220vh)";
              iframe.setAttribute("width", "100%");
            }
          };

          expand();
          observer = new MutationObserver(expand);
          observer.observe(ref.current, { childList: true, subtree: true });
          window.setTimeout(expand, 500);
          window.setTimeout(expand, 1500);
        }
      } catch {
        // Fallback: blockquote still links out to Instagram.
      }
    }

    process();
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [html, fullBleed]);

  return (
    <div
      ref={ref}
      className={
        fullBleed ? "instagram-embed w-full" : "instagram-embed mx-auto w-full max-w-md"
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
