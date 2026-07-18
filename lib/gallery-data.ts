export type GalleryImage = {
  slug: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

// Drop image files into /public/gallery and reference them here.
// See public/gallery/README.md for naming and sizing tips.
// width/height are each image's real pixel dimensions — used to lay out
// the gallery as a masonry grid that respects each photo's natural shape
// instead of cropping everything into uniform squares.
const flyers: GalleryImage[] = [
  {
    slug: "welcome-to-worship",
    src: "/gallery/welcome-to-worship.jpg",
    alt: "Welcome to a divine and refreshing time of worship in God's presence",
    caption: "Sunday Worship, every week at 9:30 AM",
    width: 1080,
    height: 814,
  },
  {
    slug: "digging-deep",
    src: "/gallery/digging-deep.jpg",
    alt: "Digging Deep Bible study flyer, every Wednesday at 7 PM PST",
    caption: "Digging Deep Bible Study — Wednesdays, 7 PM",
    width: 1440,
    height: 810,
  },
  {
    slug: "new-month-power",
    src: "/gallery/new-month-power.jpg",
    alt: "Happy New Month: Manifestation of Power flyer with Pastors Lanre and Nike Ejibunu",
    caption: "A New Month, New Mercies, New Era",
    width: 1440,
    height: 1800,
  },
  {
    slug: "power-night",
    src: "/gallery/power-night.jpg",
    alt: "Power Night flyer, a 2-hour encounter of power, presence, and purpose with Holy Communion",
    caption: "Power Night — first Friday of every month",
    width: 1440,
    height: 1800,
  },
  {
    slug: "shiloh-hour",
    src: "/gallery/shiloh-hour.jpg",
    alt: "Shiloh Hour prayer line flyer with call-in number and passcode",
    caption: "Shiloh Hour prayer line — Mondays & Fridays, 12 PM",
    width: 1440,
    height: 1800,
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
    width: 206,
    height: 206,
  };
});

// Interleave the flyers among the photos (roughly one flyer per six
// photos) instead of clustering all five up front, so the masonry grid
// mixes tall/wide graphics with the square photo texture throughout.
function interleave(featured: GalleryImage[], rest: GalleryImage[]): GalleryImage[] {
  const result: GalleryImage[] = [];
  const step = Math.ceil(rest.length / featured.length);
  let featuredIndex = 0;
  rest.forEach((photo, i) => {
    result.push(photo);
    if ((i + 1) % step === 0 && featuredIndex < featured.length) {
      result.push(featured[featuredIndex]);
      featuredIndex += 1;
    }
  });
  while (featuredIndex < featured.length) {
    result.push(featured[featuredIndex]);
    featuredIndex += 1;
  }
  return result;
}

export const galleryImages: GalleryImage[] = [flyers[0], ...interleave(flyers.slice(1), photos)];
