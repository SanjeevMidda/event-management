import { FormEvent, useEffect, useState } from "react";
import { Event } from "../data/events";
import { ValidationErrors, validateEvent } from "../utils/eventUtils";

interface EventFormProps {
  eventToEdit: Event | null;
  onSave: (event: Event) => void;
  onCancelEdit: () => void;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
}

const emptyForm: EventFormData = {
  title: "",
  description: "",
  date: "",
  location: "",
};

const EventForm = ({ eventToEdit, onSave, onCancelEdit }: EventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>(emptyForm);

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        description: eventToEdit.description,
        date: eventToEdit.date,
        location: eventToEdit.location,
      });
    } else {
      setFormData(emptyForm);
    }

    setErrors({});
  }, [eventToEdit]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validateEvent(
      formData.title,
      formData.description,
      formData.date
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const savedEvent: Event = {
      id: eventToEdit ? eventToEdit.id : Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      location: formData.location.trim(),
    };

    onSave(savedEvent);

    setFormData(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{eventToEdit ? "Edit Event" : "Create Event"}</h2>

      <div>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />

        {errors.title && <p role="alert">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <small>{formData.description.length}/250</small>

        {errors.description && <p role="alert">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="date">Date</label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        {errors.date && <p role="alert">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="location">Location</label>

        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {eventToEdit ? "Save Changes" : "Create Event"}
      </button>

      {eventToEdit && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default EventForm;
