import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EventForm from "../EventForm";

describe("EventForm", () => {
  const setup = () => {
    const user = userEvent.setup();

    const onSave = jest.fn();
    const onCancelEdit = jest.fn();

    render(
      <EventForm
        eventToEdit={null}
        onSave={onSave}
        onCancelEdit={onCancelEdit}
      />
    );

    return {
      user,
      onSave,
      onCancelEdit,
    };
  };

  test("shows validation error when title is empty", async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText(/description/i), "A description");

    await user.type(screen.getByLabelText(/date/i), "2026-12-01");

    await user.click(
      screen.getByRole("button", {
        name: /create event/i,
      })
    );

    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  test("creates an event with valid data", async () => {
    const { user, onSave } = setup();

    await user.type(screen.getByLabelText(/title/i), "New Event");

    await user.type(
      screen.getByLabelText(/description/i),
      "This is a new event"
    );

    await user.type(screen.getByLabelText(/date/i), "2026-12-01");

    await user.type(screen.getByLabelText(/location/i), "London");

    await user.click(
      screen.getByRole("button", {
        name: /create event/i,
      })
    );

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Event",
        description: "This is a new event",
        date: "2026-12-01",
        location: "London",
      })
    );
  });
});

test("populates the form when editing an event", () => {
  const event = {
    id: 1,
    title: "Existing Event",
    description: "Existing description",
    date: "2026-12-01",
    location: "London",
  };

  const onSave = jest.fn();
  const onCancelEdit = jest.fn();

  render(
    <EventForm
      eventToEdit={event}
      onSave={onSave}
      onCancelEdit={onCancelEdit}
    />
  );

  expect(screen.getByLabelText(/title/i)).toHaveValue("Existing Event");

  expect(screen.getByLabelText(/description/i)).toHaveValue(
    "Existing description"
  );

  expect(screen.getByLabelText(/date/i)).toHaveValue("2026-12-01");

  expect(screen.getByLabelText(/location/i)).toHaveValue("London");

  expect(
    screen.getByRole("button", {
      name: /save changes/i,
    })
  ).toBeInTheDocument();
});
