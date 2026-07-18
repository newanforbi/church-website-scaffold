export type ChurchEvent = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const events: ChurchEvent[] = [
  {
    slug: "summer-bbq",
    title: "Summer Community BBQ",
    date: "2026-07-25",
    time: "12:00 PM",
    location: "Church Lawn",
    description:
      "Join us after the service for food, games, and fellowship. Bring a side dish to share!",
  },
  {
    slug: "youth-night",
    title: "Youth Night",
    date: "2026-07-31",
    time: "6:30 PM",
    location: "Fellowship Hall",
    description: "A night of worship, games, and community for students in grades 6-12.",
  },
  {
    slug: "womens-bible-study",
    title: "Women's Bible Study Kickoff",
    date: "2026-08-05",
    time: "10:00 AM",
    location: "Room 204",
    description: "Our fall women's study begins with a new series on the Psalms.",
  },
  {
    slug: "back-to-school-drive",
    title: "Back-to-School Supply Drive",
    date: "2026-08-15",
    time: "9:00 AM - 1:00 PM",
    location: "Main Lobby",
    description: "Help us collect school supplies for families in our local community.",
  },
];
