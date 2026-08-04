"use client";

import { InstagramEmbed } from "@/components/instagram-embed";

/**
 * Edge-to-edge stage for Instagram's official profile embed.
 * Instagram still controls the inner chrome, but we stretch the injected
 * iframe across the desktop width and give it tall scrollable height.
 */
export function InstagramEmbedFrame({
  html,
  handle,
  profileUrl,
}: {
  html: string;
  handle: string;
  profileUrl: string;
}) {
  return (
    <div className="w-full pb-12">
      <div className="w-full px-0 sm:px-0">
        <InstagramEmbed html={html} fullBleed />
      </div>
      <p className="mx-auto mt-8 max-w-lg px-4 text-center text-sm leading-6 text-brand-600">
        Scroll to browse recent photos from @{handle}. For the complete archive,{" "}
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-brand-800 underline decoration-dawn-500/50 underline-offset-2 hover:text-brand-950"
        >
          open Instagram
        </a>
        .
      </p>
    </div>
  );
}
