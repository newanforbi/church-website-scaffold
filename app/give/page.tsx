import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Give",
  description: `Support the mission and ministries of ${siteConfig.name}.`,
};

const ways = [
  {
    title: "Cash App",
    body: "Send a gift instantly to our Cash App account.",
    detail: (
      <a
        href={siteConfig.give.cashApp.url}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 inline-block text-sm font-semibold text-brand-800 underline decoration-dawn-500/50 underline-offset-4 hover:text-brand-950"
      >
        {siteConfig.give.cashApp.cashtag} &rarr;
      </a>
    ),
  },
  {
    title: "Zelle",
    body: "Add us as a recipient in your banking app's Zelle feature.",
    detail: (
      <p className="mt-3 text-sm font-semibold text-brand-950">
        {siteConfig.give.zelle.recipient}
      </p>
    ),
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

      <section className="container-page py-20 text-center">
        <p className="mx-auto max-w-2xl text-base leading-7 text-brand-700">
          Giving is an act of worship and trust. Every gift — large or small — helps us love our
          neighbors, disciple our families, and share hope with our city. Thank you for
          partnering with us.
        </p>
        <a
          href={siteConfig.give.cashApp.url}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary mt-8"
        >
          Give via Cash App
        </a>
        <p className="mt-4 text-sm text-brand-600">
          Prefer Zelle? Send to{" "}
          <span className="font-semibold text-brand-950">{siteConfig.give.zelle.recipient}</span>{" "}
          from your banking app.
        </p>
      </section>

      <section className="surface-mist border-t border-brand-900/10 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Options</p>
            <h2 className="section-heading mt-3">Ways to Give</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-brand-900/10 border-y border-brand-900/10">
            {ways.map((way) => (
              <div
                key={way.title}
                className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <h3 className="font-serif text-xl font-medium text-brand-950">{way.title}</h3>
                <div>
                  <p className="text-sm leading-6 text-brand-700">{way.body}</p>
                  {way.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
