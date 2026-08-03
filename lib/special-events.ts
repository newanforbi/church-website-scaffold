export type SpecialEvent = {
  slug: string;
  title: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  tagline: string;
  guestSpeaker: string;
  featuring: string[];
  hosts: string;
  image: string;
  imageAlt: string;
};

// One-off special events, distinct from the recurring weekly/monthly
// schedule in recurring-events.ts. Add new entries here as they're
// announced; each is shown until its date passes.
export const specialEvents: SpecialEvent[] = [
  {
    slug: "enthroned-on-praise-2026",
    title: "Enthroned on Praise",
    subtitle: "Orunshi Voices — Annual Worship Concert",
    scripture:
      '"But thou art holy, O thou that inhabitest the praises of Israel."',
    scriptureRef: "Psalm 22:3",
    date: "2026-08-15",
    dateLabel: "Saturday, August 15, 2026",
    time: "3:00 PM – 7:00 PM",
    location: "1150 W Robinhood Drive Ste 2A, Stockton, CA 95207",
    tagline: "Let everything that has breath praise the Lord! Every voice. Every heart. One throne.",
    guestSpeaker: "Pastor Omotayo Omoloye",
    featuring: ["Tunde Lasode (T-Las)"],
    hosts: "Host Pastors Lanre & Nike Ejibunu",
    image: "/images/enthroned-on-praise-2026.png",
    imageAlt:
      "Enthroned on Praise: Orunshi Voices Annual Worship Concert flyer, Saturday August 15, 2026, 3-7 PM, featuring guest speaker Pastor Omotayo Omoloye and Tunde Lasode, hosted by Pastors Lanre and Nike Ejibunu",
  },
];

export function getActiveSpecialEvents(from: Date = new Date()): SpecialEvent[] {
  return specialEvents
    .filter((event) => new Date(`${event.date}T23:59:59`) >= from)
    .sort((a, b) => a.date.localeCompare(b.date));
}
