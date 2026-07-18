import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}'s story, beliefs, and leadership.`,
};

const beliefs = [
  {
    title: "The Bible",
    body: "We believe the Bible is God's inspired word and our authority for faith and life.",
  },
  {
    title: "The Gospel",
    body: "We believe salvation is a gift of grace through faith in Jesus Christ, not earned by works.",
  },
  {
    title: "Community",
    body: "We believe the church is a family called to worship, grow, and serve together.",
  },
  {
    title: "Mission",
    body: "We believe every person is called to love God and love their neighbor in word and deed.",
  },
];

const staff = [
  { name: "James Whitfield", role: "Lead Pastor" },
  { name: "Maria Chen", role: "Associate Pastor" },
  { name: "Tobias Reyes", role: "Worship & Youth Elder" },
  { name: "Aisha Bello", role: "Director of Operations" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Us"
        description="Get to know the people, the beliefs, and the mission behind our church family."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-heading">Our Story</h2>
            <p className="mt-4 text-base leading-7 text-brand-800">
              {siteConfig.name} started as a small gathering of families meeting in a living
              room, united by a shared desire to know God and make him known. Today, we&apos;re a
              growing community that continues to hold on to that same spirit: authentic
              relationships, honest worship, and a heart for our city.
            </p>
            <p className="mt-4 text-base leading-7 text-brand-800">
              Whether you&apos;ve been part of a church for decades or you&apos;re just starting
              to explore faith, we&apos;d love for you to find a home here.
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
          <h2 className="section-heading text-center">What We Believe</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {beliefs.map((b) => (
              <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="font-serif text-xl font-semibold text-brand-950">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-700">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-heading text-center">Our Team</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((person) => (
            <div key={person.name} className="text-center">
              <div className="mx-auto h-28 w-28 rounded-full bg-brand-100" aria-hidden="true" />
              <p className="mt-4 font-serif text-lg font-semibold text-brand-950">
                {person.name}
              </p>
              <p className="text-sm text-brand-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
