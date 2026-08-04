import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { YouTubePlayer } from "@/components/youtube-player";
import { YouTubeVideoShelf } from "@/components/youtube-video-shelf";
import { siteConfig } from "@/lib/site-config";
import {
  formatVideoDate,
  getChannelUrl,
  getChurchYouTubeContent,
  getPlaylistUrl,
} from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons and Open Heavens",
  description: `Watch recent sermons, services, and Open Heavens devotionals from ${siteConfig.name} on YouTube.`,
};

export const revalidate = 3600;

export default async function SermonsPage() {
  const content = await getChurchYouTubeContent({
    channelId: siteConfig.youtube.channelId,
    openHeavensPlaylistId: siteConfig.youtube.playlists.openHeavens,
    salvationPlaylistId: siteConfig.youtube.playlists.salvation,
    messageLimit: 18,
    openHeavensLimit: 18,
  });

  const featured = content.latestMessage || content.latest;
  const channelUrl = getChannelUrl(siteConfig.youtube.channelId);
  const openHeavensUrl = getPlaylistUrl(siteConfig.youtube.playlists.openHeavens);

  return (
    <>
      <PageHero
        eyebrow="Messages"
        title="Sermons and Open Heavens"
        description="Watch recent sermons and services from our pastors, plus daily Open Heavens devotionals — pulled live from our YouTube channel."
      />

      {featured && (
        <section className="container-page py-16">
          <div className="mx-auto max-w-5xl">
            <p className="section-eyebrow">
              {content.latestMessage ? "Latest Message" : "Latest Upload"}
            </p>
            <h2 className="section-heading mt-3">{featured.title}</h2>
            {formatVideoDate(featured) && (
              <p className="mt-2 text-sm text-brand-600">{formatVideoDate(featured)}</p>
            )}
            <div className="mt-8">
              <YouTubePlayer
                videoId={featured.id}
                title={featured.title}
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="surface-mist border-y border-brand-900/10 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Sermons &amp; Services</p>
            <h2 className="section-heading mt-3">Recent messages</h2>
            <p className="mt-4 text-base leading-7 text-brand-700">
              Teaching, worship, and outreach moments from the parish — select any title to play
              it here.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-6xl">
            <YouTubeVideoShelf
              videos={content.messages}
              title="Browse messages"
              emptyLabel="Message videos will appear here as they are published on YouTube."
            />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Daily Devotional</p>
          <h2 className="section-heading mt-3">Open Heavens</h2>
          <p className="mt-4 text-base leading-7 text-brand-700">
            Audio broadcasts of Pastor E.A. Adeboye&apos;s Open Heavens daily guide, produced by
            our parish and updated on YouTube throughout the week.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <YouTubeVideoShelf
            videos={content.openHeavens}
            title="Browse Open Heavens"
            emptyLabel="Open Heavens devotionals will appear here from our YouTube playlist."
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={openHeavensUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Open Heavens Playlist
          </a>
          <Link href="/events" className="btn-outline">
            See Gathering Times
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-ink-glow" aria-hidden="true" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow-light">Full Archive</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
              Everything on our channel
            </h2>
            <p className="mt-4 text-base leading-7 text-brand-200">
              Browse the complete uploads playlist — sermons, devotionals, and more — most recent
              first. On a phone, tap the playlist icon in the player to scroll the archive.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl">
            <YouTubePlayer
              channelId={siteConfig.youtube.channelId}
              title={`${siteConfig.name} on YouTube`}
            />
          </div>

          {content.playlists.length > 0 && (
            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
              {content.playlists.map((playlist) => (
                <a
                  key={playlist.id}
                  href={getPlaylistUrl(playlist.id)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border border-white/10 px-5 py-5 transition hover:border-dawn-400/50 hover:bg-white/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-400">
                    Playlist
                  </p>
                  <p className="mt-2 font-serif text-xl font-medium text-white">
                    {playlist.title}
                  </p>
                  {playlist.description && (
                    <p className="mt-2 text-sm leading-6 text-brand-200">{playlist.description}</p>
                  )}
                  <p className="mt-3 text-sm font-semibold text-dawn-400">Watch on YouTube &rarr;</p>
                </a>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <a
              href={channelUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
