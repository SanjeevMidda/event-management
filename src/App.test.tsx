import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("Event Management App", () => {
  test("displays existing events", () => {
    render(<App />);

    expect(screen.getByText("React Meetup")).toBeInTheDocument();

    expect(screen.getByText("TypeScript Workshop")).toBeInTheDocument();

    expect(
      screen.getByText("Product Management Conference")
    ).toBeInTheDocument();
  });

  test("deletes an event", async () => {
    const user = userEvent.setup();

    window.confirm = jest.fn(() => true);

    render(<App />);

    expect(screen.getByText("React Workshop")).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButtons[0]);

    expect(screen.queryByText("React Workshop")).not.toBeInTheDocument();
  });

  test("updates an existing event", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getAllByRole("button", {
        name: /edit/i,
      })[0]
    );

    const titleInput = screen.getByLabelText(/title/i);

    await user.clear(titleInput);

    await user.type(titleInput, "Updated React Workshop");

    await user.click(
      screen.getByRole("button", {
        name: /save changes/i,
      })
    );

    expect(screen.getByText("Updated React Workshop")).toBeInTheDocument();

    expect(screen.queryByText("React Workshop")).not.toBeInTheDocument();
  });
});
