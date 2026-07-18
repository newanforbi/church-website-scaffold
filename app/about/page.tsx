import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}'s story, vision, and leadership.`,
};

const vision = [
  "Grow in faith together",
  "Understand the Word of God deeper together",
  "Encounter the presence of God through prayers together",
  "Making way for our journey to Eternity together",
];

const mission = [
  "To make Heaven.",
  "To take as many people with us.",
  "To have a member of RCCG in every family of all nations.",
  "To accomplish No. 1 above, holiness will be our lifestyle.",
  "To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries, and within five minutes driving distance in every city and town of developed countries.",
];

const pastorRoles = [
  {
    title: "Ministry",
    body: "He and his wife, Pastor Nike Ejibunu, pastor the OrunShi Parish, affiliated with the Redeemed Christian Church of God (RCCG) in Nigeria, and are highly regarded for their leadership, marriage, and community outreach.",
  },
  {
    title: "Media & Broadcasting",
    body: "Beyond his pastoral duties, he is the Chief Executive and Owner of Okun Radio, a community online radio station based in the USA.",
  },
  {
    title: "Music & Teaching",
    body: "An active music minister and speaker, he regularly ministers on themes such as destiny, faith, and spiritual empowerment.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Us"
        description="Get to know the story, vision, and leadership behind RCCG Open Heavens Parish (OrunShi)."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-heading">Our Story</h2>
            <p className="mt-4 text-base leading-7 text-brand-800">
              RCCG Open Heavens OrunShi, a parish of RCCG Worldwide, was established by the Holy
              Spirit in 2020 during the pandemic, meeting online. The church has since been under
              the direction of God. At the center of everything we do is a commitment to bring a
              positive change to families in our community.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-800">
              We are committed to upholding our mission to provide spiritual nourishment and
              support to our members, while also reaching out to others in need.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&w=1200&q=80"
              alt="Church community gathered together"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="container-page">
          <h2 className="section-heading text-center">Our Vision</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {vision.map((v, i) => (
              <div
                key={v}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 font-serif text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-brand-800">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-16">
        <div className="container-page">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-gold-400">
            RCCG
          </p>
          <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-white sm:text-4xl">
            Our Mission
          </h2>
          <ol className="mx-auto mt-10 max-w-2xl space-y-4">
            {mission.map((m, i) => (
              <li key={m} className="flex gap-4 text-brand-100">
                <span className="font-serif text-lg font-semibold text-gold-400">{i + 1}.</span>
                <p className="text-sm leading-6">{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-heading text-center">Meet the Pastor</h2>
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 rounded-full bg-brand-100" aria-hidden="true" />
            <p className="mt-4 font-serif text-xl font-semibold text-brand-950">
              {siteConfig.contact.pastor}
            </p>
            <p className="text-sm text-brand-600">
              Parish Pastor, alongside his wife, Pastor Nike Ejibunu
            </p>
          </div>
          <p className="mt-6 text-center text-base leading-7 text-brand-800">
            God created you with a divine purpose, meant to live a life of fulfillment, passion,
            peace, joy, and significance. He wants you to be healthy and whole in every aspect of
            your life so that you can make a positive impact on those around you &mdash; and you
            don&apos;t have to do it alone. Pastor Lanre Ejibunu is a well-known clergyman, music
            minister, and media executive, serving as parish pastor alongside his wife, Pastor
            Nike Ejibunu.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pastorRoles.map((r) => (
              <div key={r.title} className="rounded-xl border border-brand-900/10 p-6">
                <h3 className="font-serif text-lg font-semibold text-brand-950">{r.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-700">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
