import {
  getUpcomingEventCount,
  sortEventsByDate,
  validateEvent,
} from "./eventUtils";

import { Event } from "../data/events";

describe("validateEvent", () => {
  test("returns an error when title is empty", () => {
    const errors = validateEvent("", "Some description", "2026-09-20");

    expect(errors.title).toBe("Title is required");
  });

  test("returns an error when date is in the past", () => {
    const errors = validateEvent(
      "React Workshop",
      "Some description",
      "2020-01-01"
    );

    expect(errors.date).toBe("Date cannot be in the past");
  });

  test("returns an error when description is over 250 characters", () => {
    const description = "a".repeat(251);

    const errors = validateEvent("React Workshop", description, "2026-09-20");

    expect(errors.description).toBe(
      "Description must be 250 characters or fewer"
    );
  });

  test("returns no errors for valid data", () => {
    const errors = validateEvent("React Workshop", "Learn React", "2026-09-20");

    expect(errors).toEqual({});
  });
});

describe("sortEventsByDate", () => {
  test("sorts events from earliest to latest", () => {
    const events: Event[] = [
      {
        id: 1,
        title: "Event 1",
        description: "",
        date: "2026-10-01",
        location: "London",
      },
      {
        id: 2,
        title: "Event 2",
        description: "",
        date: "2026-08-20",
        location: "London",
      },
      {
        id: 3,
        title: "Event 3",
        description: "",
        date: "2026-09-01",
        location: "London",
      },
    ];

    const result = sortEventsByDate(events);

    expect(result.map((event) => event.id)).toEqual([2, 3, 1]);
  });

  test("does not mutate the original array", () => {
    const events: Event[] = [
      {
        id: 1,
        title: "Event 1",
        description: "",
        date: "2026-10-01",
        location: "London",
      },
      {
        id: 2,
        title: "Event 2",
        description: "",
        date: "2026-08-20",
        location: "London",
      },
    ];

    const original = [...events];

    sortEventsByDate(events);

    expect(events).toEqual(original);
  });
});

describe("getUpcomingEventCount", () => {
  test("counts upcoming events", () => {
    const events: Event[] = [
      {
        id: 1,
        title: "Past event",
        description: "",
        date: "2020-01-01",
        location: "London",
      },
      {
        id: 2,
        title: "Future event",
        description: "",
        date: "2026-12-01",
        location: "London",
      },
    ];

    expect(getUpcomingEventCount(events)).toBe(1);
  });
});
