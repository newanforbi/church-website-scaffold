export type RecurrenceRule =
  | { frequency: "weekly"; weekday: number }
  | { frequency: "monthly-nth-weekday"; weekday: number; nth: number };

export type RecurringEvent = {
  slug: string;
  title: string;
  time: string;
  hour: number;
  minute: number;
  location: string;
  description: string;
  rule: RecurrenceRule;
};

export type UpcomingEvent = {
  slug: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
};

// Every gathering that repeats on a fixed schedule. Mirrors
// lib/site-config.ts's weeklySchedule, plus the monthly Power Night.
// Weekday numbering follows Date.getDay(): 0 = Sunday … 6 = Saturday.
export const recurringEvents: RecurringEvent[] = [
  {
    slug: "sunday-school",
    title: "Sunday School",
    time: "9:30 AM",
    hour: 9,
    minute: 30,
    location: "In-person & online",
    description: "Bible-based classes for all ages before worship.",
    rule: { frequency: "weekly", weekday: 0 },
  },
  {
    slug: "sunday-worship",
    title: "Sunday Worship",
    time: "10:30 AM",
    hour: 10,
    minute: 30,
    location: "In-person & online",
    description: "Our main worship service, with singing, the Word, and prayer.",
    rule: { frequency: "weekly", weekday: 0 },
  },
  {
    slug: "shiloh-hour-monday",
    title: "Shiloh Hour Prayer Line",
    time: "12:00 PM",
    hour: 12,
    minute: 0,
    location: "Call (757) 841-1355, passcode 7777862",
    description: "A dedicated hour of prayer over the phone.",
    rule: { frequency: "weekly", weekday: 1 },
  },
  {
    slug: "shiloh-hour-wednesday",
    title: "Shiloh Hour (in Yoruba)",
    time: "12:00 PM",
    hour: 12,
    minute: 0,
    location: "Call (757) 841-1355, passcode 7777862",
    description: "Shiloh Hour prayer line conducted in Yoruba.",
    rule: { frequency: "weekly", weekday: 3 },
  },
  {
    slug: "digging-deep",
    title: "Digging Deep Bible Study",
    time: "7:00–8:00 PM",
    hour: 19,
    minute: 0,
    location: "In-person & online",
    description: 'One hour "beneath the surface" of the Word.',
    rule: { frequency: "weekly", weekday: 3 },
  },
  {
    slug: "shiloh-hour-friday",
    title: "Shiloh Hour Prayer Line",
    time: "12:00 PM",
    hour: 12,
    minute: 0,
    location: "Call (757) 841-1355, passcode 7777862",
    description: "A dedicated hour of prayer over the phone.",
    rule: { frequency: "weekly", weekday: 5 },
  },
  {
    slug: "power-night",
    title: "Power Night",
    time: "7:00–9:00 PM",
    hour: 19,
    minute: 0,
    location: "Holy Communion",
    description: "A 2-hour encounter of power, presence, and purpose, with Holy Communion.",
    rule: { frequency: "monthly-nth-weekday", weekday: 5, nth: 1 },
  },
];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function atTime(date: Date, hour: number, minute: number): Date {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function firstWeekdayOnOrAfter(date: Date, weekday: number): Date {
  const diff = (weekday - date.getDay() + 7) % 7;
  return addDays(date, diff);
}

function nextWeeklyOccurrence(from: Date, weekday: number, hour: number, minute: number): Date {
  let candidate = atTime(firstWeekdayOnOrAfter(from, weekday), hour, minute);
  if (candidate <= from) candidate = addDays(candidate, 7);
  return candidate;
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  const first = firstWeekdayOnOrAfter(new Date(year, month, 1), weekday);
  return addDays(first, (nth - 1) * 7);
}

function nextMonthlyOccurrence(
  from: Date,
  weekday: number,
  nth: number,
  hour: number,
  minute: number,
): Date {
  let year = from.getFullYear();
  let month = from.getMonth();
  for (let i = 0; i < 24; i++) {
    const candidate = atTime(nthWeekdayOfMonth(year, month, weekday, nth), hour, minute);
    if (candidate > from) return candidate;
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
  throw new Error("Could not find next monthly occurrence within 24 months");
}

function nextOccurrenceAfter(event: RecurringEvent, after: Date): Date {
  if (event.rule.frequency === "weekly") {
    return nextWeeklyOccurrence(after, event.rule.weekday, event.hour, event.minute);
  }
  return nextMonthlyOccurrence(
    after,
    event.rule.weekday,
    event.rule.nth,
    event.hour,
    event.minute,
  );
}

// Merges all recurring events into one chronological list of the next
// `count` occurrences. Because each entry repeats on its own schedule
// indefinitely, this stays accurate for the next decade — or the next
// century — without ever needing a manual update; it's simply computed
// fresh relative to `from` each time it's called.
export function getUpcomingEvents(count: number, from: Date = new Date()): UpcomingEvent[] {
  const cursors = new Map<string, Date>(
    recurringEvents.map((e) => [e.slug, nextOccurrenceAfter(e, from)]),
  );

  const upcoming: UpcomingEvent[] = [];
  for (let i = 0; i < count; i++) {
    let bestEvent: RecurringEvent | null = null;
    let bestDate: Date | null = null;
    for (const event of recurringEvents) {
      const date = cursors.get(event.slug)!;
      if (!bestDate || date < bestDate) {
        bestDate = date;
        bestEvent = event;
      }
    }
    if (!bestEvent || !bestDate) break;
    upcoming.push({
      slug: `${bestEvent.slug}-${bestDate.toISOString().slice(0, 10)}`,
      title: bestEvent.title,
      date: bestDate,
      time: bestEvent.time,
      location: bestEvent.location,
      description: bestEvent.description,
    });
    cursors.set(bestEvent.slug, nextOccurrenceAfter(bestEvent, bestDate));
  }
  return upcoming;
}
