export type Sermon = {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  summary: string;
  videoUrl?: string;
};

export const sermons: Sermon[] = [
  {
    slug: "rooted-in-grace",
    title: "Rooted in Grace",
    speaker: "Pastor James Whitfield",
    date: "2026-07-13",
    series: "Foundations",
    summary:
      "An exploration of what it means to build a life and a church family on the unshakable foundation of grace.",
  },
  {
    slug: "a-table-for-all",
    title: "A Table for All",
    speaker: "Pastor Maria Chen",
    date: "2026-07-06",
    series: "Foundations",
    summary:
      "How the story of the early church challenges us to build a community marked by radical welcome.",
  },
  {
    slug: "walking-in-the-light",
    title: "Walking in the Light",
    speaker: "Pastor James Whitfield",
    date: "2026-06-29",
    series: "Foundations",
    summary: "A look at 1 John and what it means to walk in honesty, humility, and hope.",
  },
  {
    slug: "the-good-shepherd",
    title: "The Good Shepherd",
    speaker: "Elder Tobias Reyes",
    date: "2026-06-22",
    series: "Gospel of John",
    summary: "Jesus describes himself as the Good Shepherd who lays down his life for the sheep.",
  },
];
