import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages } from "@/lib/gallery-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos and flyers from ${siteConfig.name}.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photos & Flyers"
        title="Gallery"
        description="A look at recent services, events, and announcements from our church family."
      />

      <section className="container-page py-16">
        <GalleryLightbox images={galleryImages} />
      </section>
    </>
  );
}
