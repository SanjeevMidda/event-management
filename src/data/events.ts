export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export const initialEvents: Event[] = [
  {
    id: 0,
    title: "React Meetup",
    description:
      "A local meetup for React developers to share knowledge and network.",
    date: "2026-09-15",
    location: "London",
  },

  {
    id: 1,
    title: "TypeScript Workshop",
    description:
      "Hands-on workshop covering TypeScript fundamentals and best practices.",
    date: "2026-09-22",
    location: "Manchester",
  },

  {
    id: 2,
    title: "Product Management Conference",
    description:
      "Industry conference featuring talks on product strategy and innovation.",
    date: "2026-10-05",
    location: "Birmingham",
  },

  {
    id: 3,
    title: "Data Engineering Summit",
    description:
      "A day of talks and networking focused on modern data platforms and analytics.",
    date: "2026-10-18",
    location: "Leeds",
  },

  {
    id: 4,
    title: "Korean Language Exchange",
    description:
      "Casual conversation practice with native speakers and fellow learners.",
    date: "2026-11-02",
    location: "London",
  },

  {
    id: 5,
    title: "Tech Career Fair",
    description:
      "Meet hiring managers and learn about opportunities in software and data.",
    date: "2026-11-20",
    location: "Bristol",
  },
];
