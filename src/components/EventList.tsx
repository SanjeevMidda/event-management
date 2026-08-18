import { Event } from "../data/events";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList = ({ events, onEdit, onDelete }: EventListProps) => {
  if (events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <section>
      <h2>Upcoming Events</h2>

      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default EventList;
