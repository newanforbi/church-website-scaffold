import type { Metadata } from "next";
import Image from "next/image";
import { InstagramEmbedFrame } from "@/components/instagram-embed-frame";
import { InstagramGallery } from "@/components/instagram-gallery";
import {
  fetchInstagramMediaPage,
  getInstagramHandle,
  hasInstagramCredentials,
} from "@/lib/instagram";
import { fetchInstagramOEmbed } from "@/lib/meta-embeds";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos from ${siteConfig.name} on Instagram.`,
};

export const revalidate = 1800;

export default async function GalleryPage() {
  const instagram = siteConfig.social.find((s) => s.label === "Instagram");
  const profileUrl = siteConfig.socialEmbeds.instagramProfileUrl;
  const handle = getInstagramHandle(profileUrl);
  const connected = hasInstagramCredentials();

  const [page, profileEmbed] = await Promise.all([
    connected ? fetchInstagramMediaPage({ limit: 30 }) : Promise.resolve(null),
    connected ? Promise.resolve(null) : fetchInstagramOEmbed(profileUrl),
  ]);

  const media = page?.media ?? [];
  const showGrid = media.length > 0;

  return (
    <div className="bg-brand-50">
      <header className="border-b border-brand-900/10 bg-brand-50/90 backdrop-blur">
        <div className="flex w-full flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <p className="section-eyebrow">Instagram</p>
            <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-brand-950 sm:text-4xl">
              @{handle}
            </h1>
          </div>
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Image src={instagram.icon} alt="" width={18} height={18} className="rounded-sm" />
              Follow on Instagram
            </a>
          )}
        </div>
      </header>

      {showGrid ? (
        <InstagramGallery
          initialMedia={media}
          initialCursor={page?.nextCursor}
          profileUrl={profileUrl}
          handle={handle}
        />
      ) : profileEmbed ? (
        <InstagramEmbedFrame
          html={profileEmbed.html}
          handle={handle}
          profileUrl={profileUrl}
        />
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <p className="font-serif text-2xl font-medium text-brand-950">Gallery</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-brand-700">
            Instagram photos will appear here once the gallery is connected. In the meantime,
            follow us on Instagram.
          </p>
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary mt-6"
            >
              Open Instagram
            </a>
          )}
        </div>
      )}
    </div>
  );
}
