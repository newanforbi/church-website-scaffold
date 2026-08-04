import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { YouTubeFeed } from "@/components/youtube-feed";
import { sermons } from "@/lib/sermons-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sermons and Open Heavens",
  description: `Watch and listen to recent messages and Open Heavens devotionals from ${siteConfig.name}.`,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SermonsPage() {
  return (
    <>
      <PageHero
        eyebrow="Messages"
        title="Sermons and Open Heavens"
        description="Catch up on recent messages, Open Heavens devotionals, and full services from our YouTube channel."
      />

      <section className="container-page py-16">
        <div className="mx-auto max-w-5xl">
          <YouTubeFeed
            channelId={siteConfig.youtube.channelId}
            title={`${siteConfig.name} on YouTube`}
          />
          <p className="mt-4 text-center text-sm text-brand-600">
            Every upload from our channel, most recent first — scroll the playlist panel to browse
            the full archive. On a phone, tap the playlist icon in the top-left of the player.
          </p>
          <div className="mt-6 text-center">
            <a
              href={`https://www.youtube.com/channel/${siteConfig.youtube.channelId}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary"
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      <section className="surface-mist border-t border-brand-900/10 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Archive</p>
            <h2 className="section-heading mt-3">Featured Messages</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-brand-900/10 border-y border-brand-900/10">
            {sermons.map((sermon) => (
              <article key={sermon.slug} className="py-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-600">
                  {sermon.series}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-brand-950">
                  {sermon.title}
                </h2>
                <p className="mt-1 text-sm text-brand-600">
                  {sermon.speaker} &middot; {formatDate(sermon.date)}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-700">
                  {sermon.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
