import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { sermons } from "@/lib/sermons-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sermons",
  description: `Watch and listen to recent messages from ${siteConfig.name}.`,
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
        title="Sermons"
        description="Catch up on recent messages or revisit a series that spoke to you."
      />

      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2">
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
