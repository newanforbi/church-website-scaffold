import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { events } from "@/lib/events-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Events",
  description: `See what's happening at ${siteConfig.name}.`,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="What's Happening"
        title="Events"
        description="From weekly gatherings to community outreach, there's always something going on."
      />

      <section className="container-page py-16">
        <ul className="divide-y divide-brand-900/10">
          {events.map((event) => (
            <li key={event.slug} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start">
              <div className="flex w-20 shrink-0 flex-col items-center rounded-lg bg-brand-50 py-3 text-brand-900">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="font-serif text-2xl font-semibold">
                  {new Date(event.date).getDate()}
                </span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-950">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-600">
                  {formatDate(event.date)} &middot; {event.time} &middot; {event.location}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-800">
                  {event.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
