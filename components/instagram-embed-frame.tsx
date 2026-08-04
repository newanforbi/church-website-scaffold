"use client";

import { InstagramEmbed } from "@/components/instagram-embed";

/**
 * Fallback when Graph API credentials are not configured.
 * Instagram's official profile embed only exposes ~6 recent posts.
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
    <div className="w-full pb-16">
      <div className="w-full">
        <InstagramEmbed html={html} fullBleed />
      </div>

      <div className="mx-auto mt-10 max-w-xl px-4 text-center">
        <p className="text-sm leading-6 text-brand-700">
          Instagram only lets free embeds show about six recent posts. For a full-width gallery you
          can scroll through the archive, connect the Instagram Graph API with{" "}
          <code className="text-brand-900">INSTAGRAM_ACCESS_TOKEN</code> and{" "}
          <code className="text-brand-900">INSTAGRAM_USER_ID</code> (see{" "}
          <code className="text-brand-900">.env.example</code>).
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-outline mt-6"
        >
          Browse all photos on @{handle}
        </a>
      </div>
    </div>
  );
}
