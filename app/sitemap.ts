import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = siteConfig.nav.map((link) => ({
    url: `${siteConfig.url}${link.href}`,
    lastModified: new Date(),
  }));

  return routes;
}
