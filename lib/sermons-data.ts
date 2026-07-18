export type Sermon = {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  summary: string;
  videoUrl?: string;
};

// Sample content — replace with real messages, e.g. from your Facebook/YouTube archive.
export const sermons: Sermon[] = [
  {
    slug: "the-mystery-of-destiny-helpers",
    title: "The Mystery of Destiny Helpers",
    speaker: "Pastor Lanre Ejibunu",
    date: "2026-07-13",
    series: "Open Heavens",
    summary:
      "A study of 1 Kings 17:9 on how God positions people along our path to help carry out His purpose for our lives.",
  },
  {
    slug: "growing-in-faith-together",
    title: "Growing in Faith Together",
    speaker: "Pastor Nike Ejibunu",
    date: "2026-07-06",
    series: "Open Heavens",
    summary:
      "Understanding the Word of God more deeply as a body, and what it means to encounter His presence in prayer together.",
  },
  {
    slug: "digging-deep-holiness",
    title: "Digging Deep: A Lifestyle of Holiness",
    speaker: "Pastor Lanre Ejibunu",
    date: "2026-06-24",
    series: "Digging Deep Bible Study",
    summary: "Why holiness is central to the RCCG mission and how it shapes daily discipleship.",
  },
  {
    slug: "the-journey-to-eternity",
    title: "The Journey to Eternity",
    speaker: "Pastor Nike Ejibunu",
    date: "2026-06-15",
    series: "Open Heavens",
    summary: "Making way, together as a church family, for the journey that leads to eternity.",
  },
];
