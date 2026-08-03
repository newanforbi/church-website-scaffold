import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { getUpcomingEvents } from "@/lib/recurring-events";
import { getActiveSpecialEvents } from "@/lib/special-events";
import { getMapsUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Events",
  description: `See what's happening at ${siteConfig.name}.`,
};

// Revalidate periodically so this always shows real upcoming dates
// relative to today, without needing a redeploy.
export const revalidate = 3600;

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function EventsPage() {
  const events = getUpcomingEvents(16);
  const specialEvents = getActiveSpecialEvents();

  return (
    <>
      <PageHero
        eyebrow="What's Happening"
        title="Events"
        description="Our services and prayer gatherings repeat every week — here are the next several on the calendar."
      />

      {specialEvents.map((event) => (
        <section key={event.slug} className="border-b border-brand-900/10 bg-brand-950 py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 lg:mx-0">
              <Image
                src={event.image}
                alt={event.imageAlt}
                width={1545}
                height={1999}
                className="h-auto w-full"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
                Special Event
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                {event.title}
              </h2>
              <p className="mt-1 text-lg font-medium text-brand-200">{event.subtitle}</p>
              <p className="mt-4 text-sm font-medium text-brand-100">
                {event.dateLabel} &middot; {event.time}
              </p>
              <p className="mt-1 text-sm text-brand-300">{event.location}</p>
              <blockquote className="mt-4 max-w-xl text-sm italic leading-6 text-brand-200">
                {event.scripture}
                <span className="not-italic text-gold-400"> — {event.scriptureRef}</span>
              </blockquote>
              <dl className="mt-5 space-y-1 text-sm text-brand-200">
                <div>
                  <dt className="inline font-semibold text-white">Guest Speaker: </dt>
                  <dd className="inline">{event.guestSpeaker}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-white">Also Featuring: </dt>
                  <dd className="inline">{event.featuring.join(", ")}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-white">{event.hosts}</dt>
                </div>
              </dl>
              <p className="mt-4 max-w-xl text-base leading-7 text-brand-100">{event.tagline}</p>
              <a
                href={getMapsUrl()}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary mt-6"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="container-page pt-16 text-center">
        <a
          href={siteConfig.zoom.joinUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary"
        >
          Watch Live Online
        </a>
        <a
          href={siteConfig.zoom.joinUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 block text-sm text-brand-600 underline decoration-brand-600/40 hover:text-brand-800"
        >
          Zoom Meeting ID: {siteConfig.zoom.meetingId} &middot; Passcode: {siteConfig.zoom.passcode}
        </a>
      </section>

      <section className="container-page py-16">
        <ul className="divide-y divide-brand-900/10">
          {events.map((event) => (
            <li key={event.slug} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start">
              <div className="flex w-20 shrink-0 flex-col items-center rounded-lg bg-brand-50 py-3 text-brand-900">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {event.date.toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="font-serif text-2xl font-semibold">{event.date.getDate()}</span>
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-950">
                  {event.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-600">
                  {formatDate(event.date)} &middot; {event.time} &middot; {event.location}
                </p>
                {event.zoom && (
                  <a
                    href={siteConfig.zoom.joinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-200"
                  >
                    Zoom Meeting ID: {siteConfig.zoom.meetingId} &middot; Passcode:{" "}
                    {siteConfig.zoom.passcode}
                  </a>
                )}
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
