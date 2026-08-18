import { Event } from "./data/events";

export interface ValidationErrors {
  title?: string;
  date?: string;
  description?: string;
}

export const validateEvent = (
  title: string,
  description: string,
  date: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  }

  if (!date) {
    errors.date = "Date is required";
  } else {
    const selectedDate = new Date(`${date}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.date = "Date cannot be in the past";
    }
  }

  if (description.length > 250) {
    errors.description = "Description must be 250 characters or fewer";
  }

  return errors;
};
