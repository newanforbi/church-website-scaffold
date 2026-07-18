export type ServiceTime = {
  label: string;
  time: string;
  location?: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "RCCG Open Heavens Parish (OrunShi)",
  shortName: "RCCG OrunShi",
  tagline: "Grow in faith, together.",
  description:
    "RCCG Open Heavens Parish (OrunShi) is a Stockton, CA congregation of the Redeemed Christian Church of God, established in 2020. We're committed to spiritual nourishment for our members and reaching out to our community with the love of Christ.",
  url: "https://example-church.vercel.app",

  contact: {
    email: "rccgorunshi@gmail.com",
    phone: "(832) 382-1450",
    phoneSecondary: "(510) 967-8721",
    address: {
      line1: "1150 W. Robinhood Drive, Suite 2A",
      city: "Stockton",
      state: "CA",
      zip: "95207",
    },
    pastor: "Ass't Pastor Lanre A. Ejibunu",
    prayerLine: {
      phone: "(757) 841-1355",
      passcode: "7777862",
      schedule: "Mon & Fri 12 PM (PDT) · Wed in Yoruba 12 PM (PDT)",
    },
  },

  serviceTimes: [
    { label: "Sunday School", time: "9:30 AM", location: "In-person & online" },
    { label: "Sunday Worship", time: "10:30 AM", location: "In-person & online" },
    { label: "Digging Deep (Bible Study)", time: "Wed, 7:00–8:00 PM", location: "In-person & online" },
  ] satisfies ServiceTime[],

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Rccg-Orun-Shi-Stockton-Ca/100064716849565/",
    },
    { label: "Instagram", href: "https://www.instagram.com/rccgorunshi.stockton/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCEYR_1SJIV8MtbTvoV0c3LA" },
  ] satisfies SocialLink[],

  youtube: {
    channelId: "UCEYR_1SJIV8MtbTvoV0c3LA",
  },

  give: {
    // Replace with your real giving platform link (Tithe.ly, Pushpay, Planning Center, etc.)
    onlineGivingUrl: "https://example.com/give",
  },
} as const;
