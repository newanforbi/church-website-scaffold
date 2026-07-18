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
            Every upload from our channel, most recent first &mdash; scroll the playlist panel to
            browse the full archive. On a phone, tap the playlist icon in the top-left of the
            player to open that list.
          </p>
          <div className="mt-4 text-center">
            <a
              href={`https://www.youtube.com/channel/${siteConfig.youtube.channelId}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="section-heading text-center">Featured Messages</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {sermons.map((sermon) => (
            <article
              key={sermon.slug}
              className="flex flex-col rounded-xl border border-brand-900/10 p-6 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {sermon.series}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-brand-950">
                {sermon.title}
              </h2>
              <p className="mt-1 text-sm text-brand-600">
                {sermon.speaker} &middot; {formatDate(sermon.date)}
              </p>
              <p className="mt-3 flex-1 text-sm leading-6 text-brand-800">{sermon.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
