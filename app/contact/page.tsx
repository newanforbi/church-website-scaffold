import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getMapsUrl, siteConfig, toTelHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        description="Have a question or a prayer request? Reach us directly by phone or email."
      />

      <section className="container-page py-20">
        <div className="flex flex-wrap justify-center gap-4">
          <a href={toTelHref(siteConfig.contact.phone)} className="btn-primary">
            Call {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="btn-outline">
            Email Us
          </a>
          <a
            href={getMapsUrl()}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline"
          >
            Get Directions
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <p className="section-eyebrow">Visit</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-brand-950">Address</h2>
            <div className="divider-dawn mt-4" aria-hidden="true" />
            <p className="mt-4 text-sm leading-6 text-brand-700">
              {siteConfig.contact.address.line1}
              <br />
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
            </p>
            <p className="mt-6 text-sm font-semibold text-brand-950">Pastor</p>
            <p className="mt-1 text-sm text-brand-700">{siteConfig.contact.pastor}</p>
          </div>

          <div>
            <p className="section-eyebrow">Reach Us</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-brand-950">Phone &amp; Email</h2>
            <div className="divider-dawn mt-4" aria-hidden="true" />
            <ul className="mt-4 space-y-2 text-sm text-brand-700">
              <li>
                <a href={toTelHref(siteConfig.contact.phone)} className="hover:text-brand-950">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={toTelHref(siteConfig.contact.phoneSecondary)}
                  className="hover:text-brand-950"
                >
                  {siteConfig.contact.phoneSecondary}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-950">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="section-eyebrow">Gather</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-brand-950">Service Times</h2>
            <div className="divider-dawn mt-4" aria-hidden="true" />
            <ul className="mt-4 space-y-2 text-sm text-brand-700">
              {siteConfig.serviceTimes.map((s) => (
                <li key={s.label}>
                  <span className="font-medium text-brand-950">{s.label}</span>
                  <br />
                  {s.time}
                  {s.location ? ` · ${s.location}` : ""}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-eyebrow">Connect</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-brand-950">
              Prayer &amp; Live Stream
            </h2>
            <div className="divider-dawn mt-4" aria-hidden="true" />
            <div className="mt-4 space-y-4 text-sm text-brand-700">
              <div>
                <p className="font-medium text-brand-950">Shiloh Hour Prayer Line</p>
                <p>
                  <a
                    href={toTelHref(siteConfig.contact.prayerLine.phone)}
                    className="hover:text-brand-950"
                  >
                    {siteConfig.contact.prayerLine.phone}
                  </a>{" "}
                  · Passcode {siteConfig.contact.prayerLine.passcode}
                </p>
                <p className="mt-1 text-brand-600">{siteConfig.contact.prayerLine.schedule}</p>
              </div>
              <div>
                <p className="font-medium text-brand-950">Watch Live Online</p>
                <a
                  href={siteConfig.zoom.joinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-dawn-500/50 underline-offset-2 hover:text-brand-950"
                >
                  Join our Zoom Meeting
                </a>
                <p className="mt-1 text-brand-600">
                  Meeting ID: {siteConfig.zoom.meetingId} · Passcode: {siteConfig.zoom.passcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
