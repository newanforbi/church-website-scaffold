import Image from "next/image";
import Link from "next/link";
import { siteConfig, getMapsUrl } from "@/lib/site-config";
import { sermons } from "@/lib/sermons-data";
import { getUpcomingEvents } from "@/lib/recurring-events";
import { getActiveSpecialEvents } from "@/lib/special-events";
import { YouTubeFeed } from "@/components/youtube-feed";

// Revalidate periodically so "Upcoming Events" always reflects real
// dates relative to today, without needing a redeploy.
export const revalidate = 3600;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePage() {
  const latestSermon = sermons[0];
  const upcomingEvents = getUpcomingEvents(3);
  const specialEvent = getActiveSpecialEvents()[0];

  return (
    <>
      {specialEvent && (
        <section className="bg-dawn-500">
          <Link
            href="/events"
            className="container-page flex flex-col items-center justify-center gap-1 py-2.5 text-center sm:flex-row sm:gap-3"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-950">
              Annual Concert: {specialEvent.title}
            </span>
            <span className="text-sm text-brand-950/80">
              {specialEvent.dateLabel} &middot; {specialEvent.time}
            </span>
            <span className="text-sm font-semibold text-brand-950 underline decoration-brand-950/40 underline-offset-2">
              Details &rarr;
            </span>
          </Link>
        </section>
      )}

      <section className="relative isolate min-h-[88vh] overflow-hidden bg-brand-950">
        <Image
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="animate-slow-zoom object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="container-page relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
          <p className="animate-fade-up font-serif text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
            {siteConfig.shortName}
          </p>
          <p className="mt-2 animate-fade-up text-sm font-medium uppercase tracking-[0.22em] text-dawn-400 sm:text-base">
            Open Heavens Parish &middot; Stockton, CA
          </p>
          <h1 className="mt-6 max-w-xl animate-fade-up-delay font-serif text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 max-w-lg animate-fade-up-delay text-base leading-7 text-brand-100">
            A welcoming RCCG family gathering for worship, prayer, and the Word — in person and
            online.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-up-delay-2">
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary"
            >
              Plan Your Visit
            </a>
            <a
              href={siteConfig.zoom.joinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
            >
              Watch Live Online
            </a>
          </div>
          <div className="divider-dawn mt-10 animate-draw-line" aria-hidden="true" />
        </div>
      </section>

      <section className="surface-mist border-b border-brand-900/10 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">This Week</p>
            <h2 className="section-heading mt-3">Join us throughout the week</h2>
            <p className="mt-4 text-base leading-7 text-brand-700">
              From Sunday worship to midweek prayer, there&apos;s a place for you every week.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-brand-900/10 border-y border-brand-900/10">
            {siteConfig.weeklySchedule.map((day) => (
              <div
                key={day.day}
                className="grid gap-4 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8"
              >
                <p className="font-serif text-xl font-medium text-brand-950">{day.day}</p>
                <ul className="space-y-4">
                  {day.items.map((item) => (
                    <li key={item.label}>
                      <p className="text-sm font-semibold text-dawn-600">{item.time}</p>
                      <p className="text-base font-medium text-brand-950">{item.label}</p>
                      {item.detail && (
                        <p className="mt-0.5 text-sm text-brand-600">{item.detail}</p>
                      )}
                      {item.zoom && (
                        <a
                          href={siteConfig.zoom.joinUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-1 inline-block text-xs font-semibold text-brand-700 underline decoration-brand-700/30 underline-offset-2 hover:text-brand-900"
                        >
                          Zoom ID {siteConfig.zoom.meetingId} &middot; Passcode{" "}
                          {siteConfig.zoom.passcode}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {specialEvent && (
        <section className="bg-brand-950 py-20">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Link
              href="/events"
              className="mx-auto block w-full max-w-sm overflow-hidden transition duration-500 hover:opacity-90 lg:mx-0"
            >
              <Image
                src={specialEvent.image}
                alt={specialEvent.imageAlt}
                width={1545}
                height={1999}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 22rem, 90vw"
              />
            </Link>
            <div>
              <p className="section-eyebrow-light">Annual Concert</p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
                {specialEvent.title}
              </h2>
              <p className="mt-2 text-base text-brand-200">
                {specialEvent.dateLabel} &middot; {specialEvent.time}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-brand-100">
                {specialEvent.tagline}
              </p>
              <Link href="/events" className="btn-primary mt-8">
                View Event Details
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
            <Image
              src="/images/pastor-and-mrs.jpg"
              alt="Pastors Lanre and Nike Ejibunu"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <p className="section-eyebrow">Welcome Home</p>
            <h2 className="section-heading mt-3">You belong here.</h2>
            <div className="divider-dawn mt-5" aria-hidden="true" />
            <p className="mt-5 text-base leading-7 text-brand-700">
              Whatever brought you here today, we&apos;re glad you found us. {siteConfig.name} is
              a community learning together what it means to follow Jesus. Come as you are —
              there&apos;s a seat for you.
            </p>
            <p className="mt-4 text-sm font-medium text-brand-800">
              Pastors Lanre &amp; Nike Ejibunu
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-brand-800 underline decoration-dawn-500/60 underline-offset-4 transition hover:text-brand-950"
            >
              Learn more about us &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="surface-mist py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Watch &amp; Listen</p>
            <h2 className="section-heading mt-3">Latest from our YouTube channel</h2>
            <p className="mt-4 text-base leading-7 text-brand-700">
              Catch services, messages, and Shiloh Hour moments — new uploads appear here
              automatically.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <YouTubeFeed
              channelId={siteConfig.youtube.channelId}
              title={`${siteConfig.name} on YouTube`}
            />
            <p className="mt-3 text-center text-xs text-brand-600">
              On a phone? Tap the playlist icon in the top-left of the player to browse past
              videos.
            </p>
          </div>
          <div className="mt-8 text-center">
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

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-ink-glow" aria-hidden="true" />
        <div className="container-page relative grid gap-14 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow-light">Latest Message</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
              {latestSermon.title}
            </h2>
            <p className="mt-3 text-sm text-brand-300">
              {latestSermon.speaker} &middot; {formatDate(latestSermon.date)}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-200">
              {latestSermon.summary}
            </p>
            <Link href="/sermons" className="btn-secondary mt-8">
              View All Sermons
            </Link>
          </div>

          <div>
            <p className="section-eyebrow-light">Upcoming Events</p>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {upcomingEvents.map((event) => (
                <li key={event.slug} className="flex items-center gap-4 py-4">
                  <div className="flex w-14 shrink-0 flex-col items-center py-1 text-dawn-400">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                      {event.date.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="font-serif text-2xl font-medium text-white">
                      {event.date.getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="text-sm text-brand-300">
                      {event.time} &middot; {event.location}
                    </p>
                    {event.zoom && (
                      <a
                        href={siteConfig.zoom.joinUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 inline-block text-xs font-semibold text-dawn-400 underline decoration-dawn-400/40 underline-offset-2 hover:text-dawn-300"
                      >
                        Zoom ID {siteConfig.zoom.meetingId} &middot; Passcode{" "}
                        {siteConfig.zoom.passcode}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/events" className="btn-secondary mt-6">
              See All Events
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <p className="section-eyebrow">Give</p>
        <h2 className="section-heading mt-3">Generosity changes everything.</h2>
        <div className="divider-dawn mx-auto mt-5" aria-hidden="true" />
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-brand-700">
          Your giving supports our ministries and our mission in{" "}
          {siteConfig.contact.address.city} and beyond. Thank you for partnering with us.
        </p>
        <a
          href={siteConfig.give.cashApp.url}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-8"
        >
          Give via Cash App
        </a>
        <p className="mt-4 text-sm text-brand-600">
          Prefer Zelle? Send to{" "}
          <span className="font-semibold text-brand-900">{siteConfig.give.zelle.recipient}</span>{" "}
          from your banking app.
        </p>
      </section>
    </>
  );
}
