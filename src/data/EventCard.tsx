import { Event } from "../data/events";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  return (
    <article>
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <button onClick={() => onEdit(event)}>Edit</button>

      <button onClick={() => onDelete(event.id)}>Delete</button>
    </article>
  );
};

export default EventCard;
