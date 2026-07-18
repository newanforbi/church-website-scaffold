export type GalleryImage = {
  slug: string;
  src: string;
  alt: string;
  caption?: string;
};

// Drop image files into /public/gallery and reference them here.
// See public/gallery/README.md for naming and sizing tips.
const flyers: GalleryImage[] = [
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

// Photos pulled from the church's Facebook page. Rename slug/src or add
// a caption per entry once you know what each one shows.
const PHOTO_COUNT = 29;
const photos: GalleryImage[] = Array.from({ length: PHOTO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    slug: `photo-${n}`,
    src: `/gallery/photo-${n}.jpg`,
    alt: "Photo from RCCG Open Heavens Parish (OrunShi)",
  };
});

export const galleryImages: GalleryImage[] = [...flyers, ...photos];
