export type InstagramOEmbed = {
  html: string;
  width?: number;
  thumbnail_url?: string;
  title?: string;
  provider_name?: string;
};

/**
 * Official Instagram oEmbed helpers.
 * We do not scrape Instagram; a full scrollable photo grid uses the
 * Instagram Graph API via lib/instagram.ts when credentials are set.
 */

export async function fetchInstagramOEmbed(
  url: string,
): Promise<InstagramOEmbed | null> {
  try {
    const endpoint = new URL("https://graph.facebook.com/v22.0/instagram_oembed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("omitscript", "true");

    const res = await fetch(endpoint.toString(), {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RCCGOrunShiSite/1.0; +https://example-church.vercel.app)",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as InstagramOEmbed & { error?: unknown };
    if (!data.html || data.error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function fetchInstagramEmbeds(urls: readonly string[]) {
  const unique = Array.from(new Set(urls.map((url) => url.trim()).filter(Boolean)));
  const results = await Promise.all(
    unique.map(async (url) => {
      const embed = await fetchInstagramOEmbed(url);
      if (!embed) return null;
      return { url, html: embed.html, thumbnailUrl: embed.thumbnail_url };
    }),
  );
  return results.filter(
    (item): item is { url: string; html: string; thumbnailUrl: string | undefined } =>
      item !== null,
  );
}
