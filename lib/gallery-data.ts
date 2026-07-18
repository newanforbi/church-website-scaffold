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

// Photos pulled from the church's Facebook page — three more event
// flyers, plus candid shots from a Sunday service, an Easter street
// outreach, and a Father's Day celebration.
const photos: GalleryImage[] = [
  {
    slug: "photo-01",
    src: "/gallery/photo-01.jpg",
    alt: "Kingdom Wealth Accumulation & Protection flyer featuring Pastor Lola Olaoye, licensed financial professional",
    caption: "Kingdom Wealth Accumulation & Protection",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-02",
    src: "/gallery/photo-02.jpg",
    alt: "Happy Easter, He is Risen flyer with a Matthew 28:6 reference",
    caption: "Happy Easter — He is Risen",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-03",
    src: "/gallery/photo-03.jpg",
    alt: "The Rebranded Woman: Rising to Higher Heights flyer for the RCCG Zone CA7 Women's Fellowship Zoom meet and greet",
    caption: "The Rebranded Woman — Women's Fellowship Meet & Greet",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-04",
    src: "/gallery/photo-04.jpg",
    alt: "Pastor preaching at the pulpit during a worship service",
    caption: "Worship Time",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-05",
    src: "/gallery/photo-05.jpg",
    alt: "Worship team singing and playing keyboard during a service",
    caption: "Worship team leading praise",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-06",
    src: "/gallery/photo-06.jpg",
    alt: "Ministers and worship leaders gathered at the altar during a service",
    caption: "Ministers at the altar",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-07",
    src: "/gallery/photo-07.jpg",
    alt: "Choir and musicians performing on stage with drums and keyboard",
    caption: "Praise team in concert",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-08",
    src: "/gallery/photo-08.jpg",
    alt: "Keyboardist and vocalist leading worship music",
    caption: "Musicians leading worship",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-09",
    src: "/gallery/photo-09.jpg",
    alt: "Pastor Lanre Ejibunu preaching a sermon titled Divine Visitation from Genesis 21:1",
    caption: "Sermon: Divine Visitation",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-10",
    src: "/gallery/photo-10.jpg",
    alt: "Two women dressed up outdoors for an Easter outreach event",
    caption: "Easter outreach",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-11",
    src: "/gallery/photo-11.jpg",
    alt: "Church members holding Christ is Risen and Jesus is Resurrection and Life signs during an Easter street outreach",
    caption: "Easter street outreach",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-12",
    src: "/gallery/photo-12.jpg",
    alt: "Group holding Christ is Risen and Jesus is Alive signs on a street corner",
    caption: "Proclaiming the resurrection",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-13",
    src: "/gallery/photo-13.jpg",
    alt: "Church member holding an In God We Trust sign on the sidewalk",
    caption: "In God We Trust",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-14",
    src: "/gallery/photo-14.jpg",
    alt: "Church member holding a Jesus is Resurrection and Life sign near parked cars",
    caption: "Jesus is Resurrection and Life",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-15",
    src: "/gallery/photo-15.jpg",
    alt: "Two church members holding a Jesus is Alive sign in a parking lot",
    caption: "Jesus is Alive",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-16",
    src: "/gallery/photo-16.jpg",
    alt: "Group holding resurrection-themed signs during Easter outreach",
    caption: "Easter outreach team",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-17",
    src: "/gallery/photo-17.jpg",
    alt: "Church member holding a He is Not Here, He is Risen sign near a building",
    caption: "He is Risen",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-18",
    src: "/gallery/photo-18.jpg",
    alt: "Group holding Jesus is Alive and Christ is Risen signs outdoors",
    caption: "Christ is Risen",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-19",
    src: "/gallery/photo-19.jpg",
    alt: "Two men holding resurrection signs beside a brick building",
    caption: "Easter witness",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-20",
    src: "/gallery/photo-20.jpg",
    alt: "Larger group holding Christ is Risen and Jesus is Alive signs",
    caption: "Easter outreach gathering",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-21",
    src: "/gallery/photo-21.jpg",
    alt: "Men in traditional African attire posing with Father's Day gifts",
    caption: "Father's Day celebration",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-22",
    src: "/gallery/photo-22.jpg",
    alt: "Man in a suit holding a Dad, U R My Hero mug at the Father's Day celebration",
    caption: "Dad, U R My Hero",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-23",
    src: "/gallery/photo-23.jpg",
    alt: "Man holding a Dad, U R My Hero sign at the Father's Day celebration",
    caption: "Dad, U R My Hero",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-24",
    src: "/gallery/photo-24.jpg",
    alt: "Man in gold traditional attire holding a Best Dad sign",
    caption: "Best Dad",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-25",
    src: "/gallery/photo-25.jpg",
    alt: "Group of men posing with Father's Day gifts",
    caption: "Father's Day celebration",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-26",
    src: "/gallery/photo-26.jpg",
    alt: "Man in a blazer holding a Father's Day gift mug",
    caption: "Father's Day celebration",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-27",
    src: "/gallery/photo-27.jpg",
    alt: "Man in traditional attire holding an I Love Dad sign",
    caption: "I Love Dad",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-28",
    src: "/gallery/photo-28.jpg",
    alt: "Man holding a Happy Father's Day sign",
    caption: "Happy Father's Day",
    width: 206,
    height: 206,
  },
  {
    slug: "photo-29",
    src: "/gallery/photo-29.jpg",
    alt: "Group of men in traditional attire with Father's Day gifts",
    caption: "Father's Day celebration",
    width: 206,
    height: 206,
  },
];

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
