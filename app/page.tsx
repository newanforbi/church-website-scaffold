import Image from "next/image";
import Link from "next/link";
import { siteConfig, getMapsUrl } from "@/lib/site-config";
import { sermons } from "@/lib/sermons-data";
import { getUpcomingEvents } from "@/lib/recurring-events";
import { getActiveSpecialEvents } from "@/lib/special-events";
import { YouTubeVideoShelf } from "@/components/youtube-video-shelf";
import {
  formatVideoDate,
  getChannelUrl,
  getChurchYouTubeContent,
  getPlaylistUrl,
} from "@/lib/youtube";

// Revalidate periodically so upcoming events and YouTube shelves stay fresh.
export const revalidate = 3600;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export default async function HomePage() {
  const upcomingEvents = getUpcomingEvents(3);
  const specialEvent = getActiveSpecialEvents()[0];
  const youtube = await getChurchYouTubeContent({
    channelId: siteConfig.youtube.channelId,
    openHeavensPlaylistId: siteConfig.youtube.playlists.openHeavens,
    salvationPlaylistId: siteConfig.youtube.playlists.salvation,
    messageLimit: 8,
    openHeavensLimit: 8,
  });

  const featuredVideo = youtube.latestMessage || youtube.latest;
  const fallbackSermon = sermons[0];
  // Prefer parish messages; if the feed is thin, mix in recent Open Heavens.
  const shelfVideos =
    youtube.messages.length >= 4
      ? youtube.messages
      : uniqueById([...youtube.messages, ...youtube.openHeavens, ...youtube.recent]).slice(0, 8);

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

        <div className="container-page relative grid min-h-[88vh] gap-10 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="flex flex-col justify-end">
            <h1 className="animate-fade-up font-serif text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
              {siteConfig.shortName}
            </h1>
            <p className="mt-2 animate-fade-up text-sm font-medium uppercase tracking-[0.22em] text-dawn-400 sm:text-base">
              Open Heavens Parish &middot; Stockton, CA
            </p>
            <p className="mt-6 max-w-xl animate-fade-up-delay font-serif text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
              {siteConfig.tagline}
            </p>
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

          <div className="mx-auto w-full max-w-sm animate-fade-up-delay-2 lg:mx-0 lg:justify-self-end">
            <div className="border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/pastor-and-mrs.jpg"
                  alt="Pastors Lanre and Nike Ejibunu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  priority
                />
              </div>
              <p className="mt-4 text-center text-base font-medium text-white">
                Pastors Lanre &amp; Nike Ejibunu
              </p>
            </div>
          </div>
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
              Recent sermons and services, pulled live from YouTube. Tap a title to play —
              or explore daily Open Heavens on the sermons page.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-6xl">
            <YouTubeVideoShelf
              videos={shelfVideos}
              title="Recent uploads"
              emptyLabel="Videos from our YouTube channel will appear here soon."
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/sermons" className="btn-primary">
              Sermons &amp; Open Heavens
            </Link>
            <a
              href={getChannelUrl(siteConfig.youtube.channelId)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline"
            >
              YouTube Channel
            </a>
          </div>
          {youtube.latestOpenHeavens && (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-brand-600">
              Latest Open Heavens:{" "}
              <a
                href={getPlaylistUrl(siteConfig.youtube.playlists.openHeavens)}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-brand-800 underline decoration-dawn-500/50 underline-offset-2 hover:text-brand-950"
              >
                {youtube.latestOpenHeavens.title}
              </a>
            </p>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-ink-glow" aria-hidden="true" />
        <div className="container-page relative grid gap-14 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow-light">Latest Message</p>
            {featuredVideo ? (
              <>
                <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
                  {featuredVideo.title}
                </h2>
                {formatVideoDate(featuredVideo) && (
                  <p className="mt-3 text-sm text-brand-300">
                    {formatVideoDate(featuredVideo)} &middot; YouTube
                  </p>
                )}
                {featuredVideo.description && (
                  <p className="mt-5 max-w-xl text-base leading-7 text-brand-200 line-clamp-4">
                    {featuredVideo.description}
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
                  {fallbackSermon.title}
                </h2>
                <p className="mt-3 text-sm text-brand-300">
                  {fallbackSermon.speaker} &middot; {formatDate(fallbackSermon.date)}
                </p>
                <p className="mt-5 max-w-xl text-base leading-7 text-brand-200">
                  {fallbackSermon.summary}
                </p>
              </>
            )}
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
