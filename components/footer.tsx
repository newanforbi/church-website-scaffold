import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-6 text-brand-200">{siteConfig.tagline}</p>
          <ul className="mt-4 flex gap-3">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <span className="sr-only">{s.label}</span>
                  <Image src={s.icon} alt="" width={20} height={20} className="rounded-sm" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brand-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Service Times
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.serviceTimes.map((s) => (
              <li key={s.label} className="text-sm text-brand-200">
                <span className="text-white">{s.label}</span> &mdash; {s.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-200">
            <li>{siteConfig.contact.address.line1}</li>
            <li>
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="hover:text-white">
                {siteConfig.contact.phoneSecondary}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-300 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for the web, deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
