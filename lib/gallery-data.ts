export type GalleryImage = {
  slug: string;
  src: string;
  alt: string;
  caption?: string;
};

// Drop image files into /public/gallery and reference them here.
// See public/gallery/README.md for naming and sizing tips.
export const galleryImages: GalleryImage[] = [
  {
    slug: "welcome-to-worship",
    src: "/gallery/welcome-to-worship.jpg",
    alt: "Welcome to a divine and refreshing time of worship in God's presence",
    caption: "Sunday Worship, every week at 9:30 AM",
  },
  {
    slug: "digging-deep",
    src: "/gallery/digging-deep.jpg",
    alt: "Digging Deep Bible study flyer, every Wednesday at 7 PM PST",
    caption: "Digging Deep Bible Study — Wednesdays, 7 PM",
  },
  {
    slug: "new-month-power",
    src: "/gallery/new-month-power.jpg",
    alt: "Happy New Month: Manifestation of Power flyer with Pastors Lanre and Nike Ejibunu",
    caption: "A New Month, New Mercies, New Era",
  },
  {
    slug: "power-night",
    src: "/gallery/power-night.jpg",
    alt: "Power Night flyer, a 2-hour encounter of power, presence, and purpose with Holy Communion",
    caption: "Power Night — first Friday of every month",
  },
  {
    slug: "shiloh-hour",
    src: "/gallery/shiloh-hour.jpg",
    alt: "Shiloh Hour prayer line flyer with call-in number and passcode",
    caption: "Shiloh Hour prayer line — Mondays & Fridays, 12 PM",
  },
];
