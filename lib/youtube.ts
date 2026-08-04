import { cache } from "react";

export type YouTubeVideo = {
  id: string;
  title: string;
  publishedLabel?: string;
  publishedAt?: string;
  description?: string;
  thumbnailUrl: string;
  duration?: string;
};

export type YouTubePlaylist = {
  id: string;
  title: string;
  description?: string;
};

export type ChurchYouTubeContent = {
  latest: YouTubeVideo | null;
  latestMessage: YouTubeVideo | null;
  latestOpenHeavens: YouTubeVideo | null;
  messages: YouTubeVideo[];
  openHeavens: YouTubeVideo[];
  recent: YouTubeVideo[];
  playlists: YouTubePlaylist[];
};

const YT_WEB_CLIENT = {
  clientName: "WEB",
  clientVersion: "2.20260101.00.00",
  hl: "en",
  gl: "US",
} as const;

// Public web-client key embedded in youtube.com pages. Used only as a
// fallback if we fail to scrape a fresh key; RSS remains the hard fallback.
const FALLBACK_INNERTUBE_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";

export function getUploadsPlaylistId(channelId: string) {
  return channelId.replace(/^UC/, "UU");
}

export function getUploadsEmbedUrl(channelId: string) {
  return getPlaylistEmbedUrl(getUploadsPlaylistId(channelId));
}

export function getPlaylistEmbedUrl(playlistId: string) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`;
}

export function getVideoEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function getThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function getWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getPlaylistUrl(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

export function getChannelUrl(channelId: string) {
  return `https://www.youtube.com/channel/${channelId}`;
}

/** True for daily Open Heavens devotionals (not parish sermons that mention Open Heavens). */
export function looksLikeOpenHeavensDevotional(title: string): boolean {
  const t = title.toLowerCase();
  // Parish teaching, worship, and outreach that should stay in the messages shelf.
  if (
    /pastor\s+lanre|pastor\s+nike|adenike|ejibunu|digging\s+deep|power\s+night|shiloh\s+hour|manifestation of power|naboth|marah to elim|praise and worship|sunday praise|anointing sunday|outreach|thanksgiving offering|music concert|giving back to our community/.test(
      t,
    )
  ) {
    return false;
  }
  if (/open\s*heavens?\b|open\s*heaves\b/.test(t)) return true;
  return /\badeboye\b/.test(t);
}

function cleanTitle(title: string) {
  return title.replace(/\s+/g, " ").trim();
}

function videoFromId(id: string, title: string, extras: Partial<YouTubeVideo> = {}): YouTubeVideo {
  return {
    id,
    title: cleanTitle(title),
    thumbnailUrl: getThumbnailUrl(id),
    ...extras,
  };
}

function uniqueVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
  const seen = new Set<string>();
  const out: YouTubeVideo[] = [];
  for (const video of videos) {
    if (!video.id || seen.has(video.id)) continue;
    seen.add(video.id);
    out.push(video);
  }
  return out;
}

async function fetchText(url: string, init?: RequestInit): Promise<string | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        ...(init?.headers || {}),
      },
      // RSS is small and safe to revalidate; Innertube payloads are handled separately.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    // Innertube payloads can exceed Next's 2MB fetch-cache limit; when that
    // happens Next skips caching the raw response but page-level ISR still works.
    const res = await fetch(url, {
      ...init,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        ...(init?.headers || {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

let cachedInnertubeKey: string | null = null;

async function getInnertubeKey(): Promise<string> {
  if (cachedInnertubeKey) return cachedInnertubeKey;
  const html = await fetchText("https://www.youtube.com/");
  const match = html?.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
  cachedInnertubeKey = match?.[1] || FALLBACK_INNERTUBE_KEY;
  return cachedInnertubeKey;
}

function extractLockupVideos(node: unknown): YouTubeVideo[] {
  const found: YouTubeVideo[] = [];

  const walk = (value: unknown) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value !== "object") return;

    const obj = value as Record<string, unknown>;
    if (obj.lockupViewModel && typeof obj.lockupViewModel === "object") {
      const lv = obj.lockupViewModel as Record<string, unknown>;
      const id = typeof lv.contentId === "string" ? lv.contentId : null;
      const metadata = lv.metadata as Record<string, unknown> | undefined;
      const lockupMeta = metadata?.lockupMetadataViewModel as Record<string, unknown> | undefined;
      const titleObj = lockupMeta?.title as Record<string, unknown> | undefined;
      const title = typeof titleObj?.content === "string" ? titleObj.content : null;

      let publishedLabel: string | undefined;
      const contentMeta = lockupMeta?.metadata as Record<string, unknown> | undefined;
      const rows =
        (contentMeta?.contentMetadataViewModel as Record<string, unknown> | undefined)?.metadataRows;
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const parts = (row as Record<string, unknown>).metadataParts;
          if (!Array.isArray(parts)) continue;
          for (const part of parts) {
            const text = ((part as Record<string, unknown>).text as Record<string, unknown> | undefined)
              ?.content;
            if (typeof text === "string" && /(ago|streamed|premiered)/i.test(text)) {
              publishedLabel = text;
            }
          }
        }
      }

      if (id && title && (id.length === 11 || id.startsWith("PL"))) {
        if (id.length === 11) {
          found.push(videoFromId(id, title, { publishedLabel }));
        }
      }
    }

    for (const child of Object.values(obj)) walk(child);
  };

  walk(node);
  return uniqueVideos(found);
}

function extractContinuationToken(node: unknown): string | null {
  let token: string | null = null;
  const walk = (value: unknown) => {
    if (token || !value) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value !== "object") return;
    const obj = value as Record<string, unknown>;
    const command = obj.continuationCommand as Record<string, unknown> | undefined;
    if (command && typeof command.token === "string") {
      token = command.token;
      return;
    }
    for (const child of Object.values(obj)) walk(child);
  };
  walk(node);
  return token;
}

async function innertubeBrowse(body: Record<string, unknown>): Promise<unknown | null> {
  const key = await getInnertubeKey();
  return fetchJson(`https://www.youtube.com/youtubei/v1/browse?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      context: { client: YT_WEB_CLIENT },
      ...body,
    }),
  });
}

async function fetchInnertubeChannelVideos(
  channelId: string,
  pages = 2,
): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];
  let token: string | null = null;

  for (let page = 0; page < pages; page++) {
    const data = token
      ? await innertubeBrowse({ continuation: token })
      : await innertubeBrowse({
          browseId: channelId,
          params: "EgZ2aWRlb3PyBgQKAjoA",
        });
    if (!data) break;
    videos.push(...extractLockupVideos(data));
    token = extractContinuationToken(data);
    if (!token) break;
  }

  return uniqueVideos(videos);
}

async function fetchInnertubePlaylistVideos(
  playlistId: string,
  pages = 1,
): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];
  let token: string | null = null;

  for (let page = 0; page < pages; page++) {
    const data = token
      ? await innertubeBrowse({ continuation: token })
      : await innertubeBrowse({ browseId: `VL${playlistId}` });
    if (!data) break;
    videos.push(...extractLockupVideos(data));
    token = extractContinuationToken(data);
    if (!token) break;
  }

  return uniqueVideos(videos);
}

async function fetchRssVideos(feedUrl: string): Promise<YouTubeVideo[]> {
  const xml = await fetchText(feedUrl);
  if (!xml) return [];
  return parseRssWithRegex(xml);
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseRssWithRegex(xml: string): YouTubeVideo[] {
  const entries = xml.split("<entry>").slice(1);
  const videos: YouTubeVideo[] = [];
  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    const description = entry.match(/<media:description>([^<]*)<\/media:description>/)?.[1];
    if (id && title) {
      videos.push(
        videoFromId(id, decodeXmlEntities(title), {
          publishedAt,
          description: description ? decodeXmlEntities(description) : undefined,
        }),
      );
    }
  }
  return uniqueVideos(videos);
}

export async function fetchChannelRss(channelId: string): Promise<YouTubeVideo[]> {
  return fetchRssVideos(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
}

export async function fetchPlaylistRss(playlistId: string): Promise<YouTubeVideo[]> {
  return fetchRssVideos(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`);
}

function preferOrdered(primary: YouTubeVideo[], secondary: YouTubeVideo[]): YouTubeVideo[] {
  const secondaryById = new Map(secondary.map((video) => [video.id, video]));
  const seen = new Set<string>();
  const out: YouTubeVideo[] = [];

  for (const video of primary) {
    const extra = secondaryById.get(video.id);
    out.push(extra ? { ...video, ...extra, ...video, description: extra.description || video.description } : video);
    seen.add(video.id);
  }

  for (const video of secondary) {
    if (seen.has(video.id)) continue;
    out.push(video);
    seen.add(video.id);
  }

  return out;
}

async function loadChurchYouTubeContent(
  channelId: string,
  openHeavensPlaylistId = "",
  salvationPlaylistId = "",
  messageLimit = 12,
  openHeavensLimit = 12,
): Promise<ChurchYouTubeContent> {

  const playlists: YouTubePlaylist[] = [];
  if (openHeavensPlaylistId) {
    playlists.push({
      id: openHeavensPlaylistId,
      title: "Open Heavens",
      description: "Daily Open Heavens devotionals from our channel.",
    });
  }
  if (salvationPlaylistId) {
    playlists.push({
      id: salvationPlaylistId,
      title: "Salvation",
      description: "Messages on salvation and new life in Christ.",
    });
  }

  const [channelRss, openHeavensRss, channelInnertube, openHeavensInnertube] = await Promise.all([
    fetchChannelRss(channelId),
    openHeavensPlaylistId ? fetchPlaylistRss(openHeavensPlaylistId) : Promise.resolve([]),
    // Several pages — the channel posts Open Heavens daily, so sermons are
    // spaced farther apart in the uploads feed.
    fetchInnertubeChannelVideos(channelId, 6),
    openHeavensPlaylistId
      ? fetchInnertubePlaylistVideos(openHeavensPlaylistId, 1)
      : Promise.resolve([]),
  ]);

  // Prefer Innertube order (already newest-first and paginated). Enrich with RSS
  // metadata (ISO dates / descriptions), then append any RSS-only items.
  const recent = preferOrdered(channelInnertube, channelRss);
  const openHeavensAll = preferOrdered(openHeavensInnertube, openHeavensRss);
  const openHeavenIds = new Set(openHeavensAll.map((v) => v.id));

  const messages = recent.filter(
    (video) => !openHeavenIds.has(video.id) && !looksLikeOpenHeavensDevotional(video.title),
  );

  // Prefer playlist-backed Open Heavens; fall back to title heuristic from channel feed.
  const openHeavens =
    openHeavensAll.length > 0
      ? openHeavensAll
      : recent.filter((video) => looksLikeOpenHeavensDevotional(video.title));

  const latest = recent[0] || openHeavens[0] || null;
  const latestMessage = messages[0] || null;
  const latestOpenHeavens = openHeavens[0] || null;

  return {
    latest,
    latestMessage,
    latestOpenHeavens,
    messages: messages.slice(0, messageLimit),
    openHeavens: openHeavens.slice(0, openHeavensLimit),
    recent: recent.slice(0, Math.max(messageLimit, openHeavensLimit)),
    playlists,
  };
}

const getChurchYouTubeContentCached = cache(loadChurchYouTubeContent);

/** Church YouTube shelves — deduped per request; pages should set `revalidate`. */
export async function getChurchYouTubeContent(options: {
  channelId: string;
  openHeavensPlaylistId?: string;
  salvationPlaylistId?: string;
  messageLimit?: number;
  openHeavensLimit?: number;
}): Promise<ChurchYouTubeContent> {
  return getChurchYouTubeContentCached(
    options.channelId,
    options.openHeavensPlaylistId || "",
    options.salvationPlaylistId || "",
    options.messageLimit ?? 12,
    options.openHeavensLimit ?? 12,
  );
}

export function formatVideoDate(video: YouTubeVideo): string {
  if (video.publishedLabel) return video.publishedLabel;
  if (!video.publishedAt) return "";
  return new Date(video.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
