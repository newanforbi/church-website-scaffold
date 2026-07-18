import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

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

      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary">
              Call Us: {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="btn-outline">
              Email Us
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <dl className="space-y-4 text-sm text-brand-800">
            <div>
              <dt className="font-semibold text-brand-950">Address</dt>
              <dd>
                {siteConfig.contact.address.line1}
                <br />
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                {siteConfig.contact.address.zip}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Phone</dt>
              <dd>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-brand-700">
                  {siteConfig.contact.phone}
                </a>
                {" · "}
                <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="hover:text-brand-700">
                  {siteConfig.contact.phoneSecondary}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Email</dt>
              <dd>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-700">
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Pastor</dt>
              <dd>{siteConfig.contact.pastor}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Service Times</dt>
              <dd className="space-y-1">
                {siteConfig.serviceTimes.map((s) => (
                  <p key={s.label}>
                    {s.label}: {s.time}
                  </p>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Shiloh Hour Prayer Line</dt>
              <dd>
                <a
                  href={`tel:${siteConfig.contact.prayerLine.phone}`}
                  className="hover:text-brand-700"
                >
                  {siteConfig.contact.prayerLine.phone}
                </a>{" "}
                &middot; Passcode {siteConfig.contact.prayerLine.passcode}
                <br />
                {siteConfig.contact.prayerLine.schedule}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-950">Watch Live Online</dt>
              <dd>
                <a
                  href={siteConfig.zoom.joinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-brand-700"
                >
                  Join our Zoom Meeting
                </a>
                <br />
                <a href={siteConfig.zoom.joinUrl} target="_blank" rel="noreferrer noopener" className="hover:text-brand-700">
                  Meeting ID: {siteConfig.zoom.meetingId} &middot; Passcode:{" "}
                  {siteConfig.zoom.passcode}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
