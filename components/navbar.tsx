"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-900/10 bg-brand-50/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-brand-50/70 backdrop-blur-sm"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-[4.25rem]">
        <Link href="/" className="group min-w-0">
          <span className="block font-serif text-lg font-medium tracking-tight text-brand-950 transition group-hover:text-brand-700 sm:text-xl">
            {siteConfig.shortName}
          </span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.18em] text-brand-500 sm:block">
            Open Heavens Parish
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-brand-700 ${
                    isActive ? "text-brand-800" : "text-brand-950/70"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-dawn-500 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/give" className="btn-primary hidden lg:inline-flex">
          Give Online
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-950 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-brand-900/10 bg-brand-50 lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-brand-950/80 hover:bg-brand-100 hover:text-brand-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/give" onClick={() => setOpen(false)} className="btn-primary w-full">
                Give Online
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
