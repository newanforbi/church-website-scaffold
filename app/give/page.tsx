import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Give",
  description: `Support the mission and ministries of ${siteConfig.name}.`,
};

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
          href={siteConfig.give.cashApp.url}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-8"
        >
          Give via Cash App
        </a>
        <p className="mt-3 text-sm text-brand-700">
          Prefer Zelle? Send to{" "}
          <span className="font-semibold text-brand-950">{siteConfig.give.zelle.recipient}</span>{" "}
          from your banking app.
        </p>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="container-page">
          <h2 className="section-heading text-center">Ways to Give</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="font-serif text-xl font-semibold text-brand-950">Cash App</h3>
              <p className="mt-2 text-sm leading-6 text-brand-700">
                Send a gift to our Cash App account.
              </p>
              <a
                href={siteConfig.give.cashApp.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                {siteConfig.give.cashApp.cashtag} &rarr;
              </a>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="font-serif text-xl font-semibold text-brand-950">Zelle</h3>
              <p className="mt-2 text-sm leading-6 text-brand-700">
                Add us as a recipient in your own banking app&apos;s Zelle feature.
              </p>
              <p className="mt-3 text-sm font-semibold text-brand-950">
                {siteConfig.give.zelle.recipient}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="font-serif text-xl font-semibold text-brand-950">In Person</h3>
              <p className="mt-2 text-sm leading-6 text-brand-700">
                Give during a Sunday service using the giving boxes at the sanctuary entrance.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="font-serif text-xl font-semibold text-brand-950">By Mail</h3>
              <p className="mt-2 text-sm leading-6 text-brand-700">
                Mail a check to {siteConfig.contact.address.line1},{" "}
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                {siteConfig.contact.address.zip}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
