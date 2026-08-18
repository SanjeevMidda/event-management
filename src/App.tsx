import { useMemo, useState } from "react";
import "./index.css";

import { Event, initialEvents } from "./data/events";

import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

import { getUpcomingEventCount, sortEventsByDate } from "./utils/eventUtils";

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const sortedEvents = useMemo(
    () => sortEventsByDate(events),

    [events]
  );

  const upcomingEventCount = useMemo(
    () => getUpcomingEventCount(events),

    [events]
  );

  const handleSaveEvent = (event: Event) => {
    setEvents((previousEvents) => {
      const existingEvent = previousEvents.find(
        (existing) => existing.id === event.id
      );

      if (existingEvent) {
        return previousEvents.map((existing) =>
          existing.id === event.id ? event : existing
        );
      }

      return [...previousEvents, event];
    });

    setEventToEdit(null);
  };

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
  };

  const handleDeleteEvent = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    setEvents((previousEvents) =>
      previousEvents.filter((event) => event.id !== id)
    );

    if (eventToEdit?.id === id) {
      setEventToEdit(null);
    }
  };

  const handleCancelEdit = () => {
    setEventToEdit(null);
  };
  return (
    <main className="app">
      <h1>Event Management</h1>

      <p>
        Upcoming events: <strong>{upcomingEventCount}</strong>
      </p>

      <EventForm
        eventToEdit={eventToEdit}
        onSave={handleSaveEvent}
        onCancelEdit={handleCancelEdit}
      />

      <EventList
        events={sortedEvents}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </main>
  );
}

export default App;
