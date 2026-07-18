import Image from "next/image";
import Link from "next/link";
import { siteConfig, getMapsUrl } from "@/lib/site-config";
import { sermons } from "@/lib/sermons-data";
import { getUpcomingEvents } from "@/lib/recurring-events";
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

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-950">
        <Image
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="container-page relative grid min-h-[32rem] gap-10 py-24 sm:min-h-[36rem] lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-100">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
            <a
              href={siteConfig.zoom.joinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-block text-xs text-brand-300 underline decoration-brand-300/50 hover:text-white"
            >
              Zoom Meeting ID: {siteConfig.zoom.meetingId} &middot; Passcode:{" "}
              {siteConfig.zoom.passcode}
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/pastor-and-mrs.jpg"
                  alt="Pastors Lanre and Nike Ejibunu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, 80vw"
                />
              </div>
              <p className="mt-4 text-center text-base font-semibold text-white">
                Pastors Lanre &amp; Nike Ejibunu
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-900/10 bg-brand-50 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              This Week
            </p>
            <h2 className="section-heading mt-2">Join Us Throughout the Week</h2>
            <p className="mt-4 text-base leading-7 text-brand-800">
              From Sunday worship to midweek prayer, there&apos;s a place for you every week.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.weeklySchedule.map((day) => (
              <div
                key={day.day}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5"
              >
                <p className="font-serif text-lg font-semibold text-brand-950">{day.day}</p>
                <ul className="mt-4 space-y-4">
                  {day.items.map((item) => (
                    <li key={item.label}>
                      <p className="text-sm font-semibold text-brand-700">{item.time}</p>
                      <p className="text-sm font-medium text-brand-950">{item.label}</p>
                      {item.detail && <p className="text-xs text-brand-600">{item.detail}</p>}
                      {item.zoom && (
                        <a
                          href={siteConfig.zoom.joinUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-1 inline-block text-xs font-semibold text-brand-700 underline decoration-brand-700/40 hover:text-brand-900"
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

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80"
              alt="Congregation gathered in worship"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Welcome Home
            </p>
            <h2 className="section-heading mt-2">You belong here.</h2>
            <p className="mt-4 text-base leading-7 text-brand-800">
              Whatever brought you here today, we&apos;re glad you found us. {siteConfig.name} is
              a community of people from every background who are learning together what it
              means to follow Jesus. Come as you are &mdash; there&apos;s a seat for you.
            </p>
            <Link href="/about" className="mt-6 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900">
              Learn more about us &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Watch & Listen
            </p>
            <h2 className="section-heading mt-2">Latest From Our YouTube Channel</h2>
            <p className="mt-4 text-base leading-7 text-brand-800">
              Catch our services, messages, and Shiloh Hour moments &mdash; new uploads show up
              here automatically.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <YouTubeFeed
              channelId={siteConfig.youtube.channelId}
              title={`${siteConfig.name} on YouTube`}
            />
            <p className="mt-3 text-center text-xs text-brand-600">
              Browsing on a phone? Tap the playlist icon in the top-left of the player to scroll
              through past videos.
            </p>
          </div>
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

      <section className="bg-brand-950 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Latest Message
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
              {latestSermon.title}
            </h2>
            <p className="mt-3 text-sm text-brand-300">
              {latestSermon.speaker} &middot; {formatDate(latestSermon.date)}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-200">
              {latestSermon.summary}
            </p>
            <Link href="/sermons" className="btn-secondary mt-6">
              View All Sermons and Open Heavens
            </Link>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Upcoming Events
            </p>
            <ul className="mt-4 divide-y divide-white/10">
              {upcomingEvents.map((event) => (
                <li key={event.slug} className="flex items-center gap-4 py-4">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-white/10 py-2 text-white">
                    <span className="text-xs font-semibold uppercase">
                      {event.date.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="font-serif text-xl font-semibold">
                      {event.date.getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{event.title}</p>
                    <p className="text-sm text-brand-300">
                      {event.time} &middot; {event.location}
                    </p>
                    {event.zoom && (
                      <a
                        href={siteConfig.zoom.joinUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 inline-block text-xs font-semibold text-gold-400 underline decoration-gold-400/40 hover:text-gold-500"
                      >
                        Zoom ID {siteConfig.zoom.meetingId} &middot; Passcode{" "}
                        {siteConfig.zoom.passcode}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/events" className="btn-secondary mt-2">
              See All Events
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="section-heading">Generosity changes everything.</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-brand-800">
          Your giving supports our ministries, our staff, and our mission in{" "}
          {siteConfig.contact.address.city} and beyond. Thank you for partnering with us.
        </p>
        <a
          href={siteConfig.give.cashApp.url}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-6"
        >
          Give via Cash App
        </a>
        <p className="mt-3 text-sm text-brand-700">
          Prefer Zelle? Send to{" "}
          <span className="font-semibold text-brand-950">{siteConfig.give.zelle.recipient}</span>{" "}
          from your banking app.
        </p>
      </section>
    </>
  );
}
