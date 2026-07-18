import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Give",
  description: `Support the mission and ministries of ${siteConfig.name}.`,
};

const ways = [
  {
    title: "Online",
    body: "Give a one-time or recurring gift securely online in just a few minutes.",
  },
  {
    title: "In Person",
    body: "Give during a Sunday service using the giving boxes at the sanctuary entrance.",
  },
  {
    title: "By Mail",
    body: `Mail a check to ${siteConfig.contact.address.line1}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}.`,
  },
];

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Generosity"
        title="Give"
        description="Your generosity fuels our ministries, cares for our community, and reaches our city."
      />

      <section className="container-page py-16 text-center">
        <p className="mx-auto max-w-2xl text-base leading-7 text-brand-800">
          Giving is an act of worship and trust. Every gift &mdash; large or small &mdash; helps
          us love our neighbors, disciple our kids and students, and share hope with our city.
          Thank you for partnering with us.
        </p>
        <a
          href={siteConfig.give.onlineGivingUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-8"
        >
          Give Online Now
        </a>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="container-page">
          <h2 className="section-heading text-center">Ways to Give</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {ways.map((w) => (
              <div key={w.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="font-serif text-xl font-semibold text-brand-950">{w.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-700">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
