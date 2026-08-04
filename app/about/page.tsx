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
    body: "Together with Pastor Nike Ejibunu, he leads OrunShi Parish — affiliated with the Redeemed Christian Church of God — with a heart for worship, marriage, and community outreach.",
  },
  {
    title: "Media & Broadcasting",
    body: "Beyond the pulpit, he is the Chief Executive and Owner of Okun Radio, a community online radio station based in the USA.",
  },
  {
    title: "Music & Teaching",
    body: "An active music minister and speaker, he regularly ministers on themes of destiny, faith, and spiritual empowerment.",
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

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Since 2020</p>
            <h2 className="section-heading mt-3">Our Story</h2>
            <div className="divider-dawn mt-5" aria-hidden="true" />
            <p className="mt-5 text-base leading-7 text-brand-700">
              RCCG Open Heavens OrunShi, a parish of RCCG Worldwide, was established by the Holy
              Spirit in 2020 during the pandemic, meeting online. The church has since been under
              the direction of God. At the center of everything we do is a commitment to bring a
              positive change to families in our community.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-700">
              We are committed to upholding our mission to provide spiritual nourishment and
              support to our members, while also reaching out to others in need.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/gallery/photo-06.jpg"
              alt="Ministers and worship leaders gathered at the altar"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="surface-mist py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Together</p>
            <h2 className="section-heading mt-3">Our Vision</h2>
          </div>
          <ol className="mx-auto mt-12 max-w-3xl space-y-0 divide-y divide-brand-900/10 border-y border-brand-900/10">
            {vision.map((v, i) => (
              <li key={v} className="flex items-start gap-5 py-5">
                <span className="font-serif text-2xl font-medium text-dawn-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-base leading-7 text-brand-800">{v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div className="pointer-events-none absolute inset-0 bg-ink-glow" aria-hidden="true" />
        <div className="container-page relative">
          <p className="section-eyebrow-light text-center">RCCG</p>
          <h2 className="mt-3 text-center font-serif text-3xl font-medium text-white sm:text-4xl">
            Our Mission
          </h2>
          <ol className="mx-auto mt-12 max-w-2xl space-y-5">
            {mission.map((m, i) => (
              <li key={m} className="flex gap-4 text-brand-100">
                <span className="font-serif text-lg font-medium text-dawn-400">{i + 1}.</span>
                <p className="text-sm leading-6 sm:text-base">{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Leadership</p>
          <h2 className="section-heading mt-3">Meet the Pastors</h2>
          <div className="divider-dawn mx-auto mt-5" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-dawn-400/40 ring-offset-4 ring-offset-brand-50 sm:h-48 sm:w-48">
              <Image
                src="/images/pastor-and-mrs.jpg"
                alt="Pastors Lanre and Nike Ejibunu"
                fill
                className="object-cover"
                sizes="12rem"
              />
            </div>
            <p className="mt-6 font-serif text-2xl font-medium text-brand-950">
              {siteConfig.contact.pastor}
            </p>
            <p className="mt-1 text-sm text-brand-600">
              Parish Pastor, alongside Pastor Nike Ejibunu
            </p>
          </div>

          <p className="mt-8 text-center text-base leading-7 text-brand-700">
            Pastor Lanre Ejibunu is a clergyman, music minister, and media executive. He serves
            as parish pastor alongside his wife, Pastor Nike Ejibunu, leading OrunShi with a
            passion for worship and discipleship.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {pastorRoles.map((r) => (
              <div key={r.title} className="text-center sm:text-left">
                <h3 className="font-serif text-xl font-medium text-brand-950">{r.title}</h3>
                <div className="divider-dawn mx-auto mt-3 sm:mx-0" aria-hidden="true" />
                <p className="mt-3 text-sm leading-6 text-brand-700">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
