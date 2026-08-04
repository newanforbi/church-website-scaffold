import Image from "next/image";
import Link from "next/link";
import { siteConfig, toTelHref } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <div className="pointer-events-none absolute inset-0 bg-ink-glow" aria-hidden="true" />
      <div className="container-page relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-serif text-2xl font-medium text-white">{siteConfig.shortName}</p>
          <p className="mt-1 text-sm text-dawn-400">{siteConfig.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-brand-200">{siteConfig.tagline}</p>
          <ul className="mt-6 flex gap-3">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                  <span className="sr-only">{s.label}</span>
                  <Image src={s.icon} alt="" width={20} height={20} className="rounded-sm" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-400">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brand-200 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-400">
            Service Times
          </p>
          <ul className="mt-4 space-y-3">
            {siteConfig.serviceTimes.map((s) => (
              <li key={s.label} className="text-sm text-brand-200">
                <span className="block font-medium text-white">{s.label}</span>
                {s.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dawn-400">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-200">
            <li>{siteConfig.contact.address.line1}</li>
            <li>
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
            </li>
            <li>
              <a href={toTelHref(siteConfig.contact.phone)} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={toTelHref(siteConfig.contact.phoneSecondary)} className="hover:text-white">
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

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-300 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Stockton, California</p>
        </div>
      </div>
    </footer>
  );
}
