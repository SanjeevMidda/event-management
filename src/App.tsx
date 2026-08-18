import { useMemo, useState } from "react";
import "./index.css";

import { Event, initialEvents } from "./data/events";

import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

import { getUpcomingEventCount, sortEventsByDate } from "./utils/eventUtils";

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

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
