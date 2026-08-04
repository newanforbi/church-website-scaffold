export type InstagramMedia = {
  id: string;
  permalink: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  mediaUrl: string;
  thumbnailUrl?: string;
  timestamp?: string;
};

export type InstagramPage = {
  media: InstagramMedia[];
  nextCursor?: string;
  source: "graph" | "none";
};

type GraphMediaNode = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  children?: {
    data?: Array<{
      id: string;
      media_type?: string;
      media_url?: string;
      thumbnail_url?: string;
    }>;
  };
};

function getCredentials() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  if (!accessToken || !userId) return null;
  return { accessToken, userId };
}

function mapNode(node: GraphMediaNode): InstagramMedia | null {
  const mediaUrl = node.media_url || node.children?.data?.[0]?.media_url;
  if (!mediaUrl || !node.permalink) return null;

  return {
    id: node.id,
    permalink: node.permalink,
    caption: node.caption,
    mediaType: node.media_type || "IMAGE",
    mediaUrl,
    thumbnailUrl: node.thumbnail_url || mediaUrl,
    timestamp: node.timestamp,
  };
}

/** Fetch a page of Instagram media via the official Graph API. */
export async function fetchInstagramMediaPage(options?: {
  limit?: number;
  after?: string;
}): Promise<InstagramPage> {
  const creds = getCredentials();
  if (!creds) return { media: [], source: "none" };

  const limit = Math.min(Math.max(options?.limit ?? 24, 1), 50);
  const url = new URL(`https://graph.facebook.com/v22.0/${creds.userId}/media`);
  url.searchParams.set(
    "fields",
    [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{media_type,media_url,thumbnail_url}",
    ].join(","),
  );
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", creds.accessToken);
  if (options?.after) url.searchParams.set("after", options.after);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return { media: [], source: "graph" };

    const data = (await res.json()) as {
      data?: GraphMediaNode[];
      paging?: { cursors?: { after?: string }; next?: string };
      error?: unknown;
    };

    if (data.error || !data.data) return { media: [], source: "graph" };

    const media = data.data
      .map(mapNode)
      .filter((item): item is InstagramMedia => Boolean(item));

    return {
      media,
      nextCursor: data.paging?.cursors?.after,
      source: "graph",
    };
  } catch {
    return { media: [], source: "graph" };
  }
}

export function hasInstagramCredentials() {
  return Boolean(getCredentials());
}

export function getInstagramHandle(profileUrl: string) {
  return profileUrl.replace(/\/$/, "").split("/").pop() || "instagram";
}
