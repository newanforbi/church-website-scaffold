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
  name: "Grace Community Church",
  shortName: "Grace Community",
  tagline: "A welcoming church family, growing in faith together.",
  description:
    "Grace Community Church is a warm, welcoming congregation dedicated to worship, community, and service. Join us for Sunday services, midweek gatherings, and outreach events.",
  url: "https://example-church.vercel.app",

  contact: {
    email: "hello@example-church.org",
    phone: "+1 (555) 123-4567",
    address: {
      line1: "100 Faith Avenue",
      city: "Springfield",
      state: "IL",
      zip: "62701",
    },
  },

  serviceTimes: [
    { label: "Sunday Worship", time: "9:00 AM & 11:00 AM", location: "Main Sanctuary" },
    { label: "Sunday School", time: "9:00 AM", location: "Education Wing" },
    { label: "Wednesday Bible Study", time: "7:00 PM", location: "Fellowship Hall" },
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
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ] satisfies SocialLink[],

  give: {
    // Replace with your real giving platform link (Tithe.ly, Pushpay, Planning Center, etc.)
    onlineGivingUrl: "https://example.com/give",
  },
} as const;
