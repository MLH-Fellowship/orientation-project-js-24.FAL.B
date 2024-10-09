import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import User from "./components/User/page.jsx";

// App component test
test("renders main components of Resume Builder", () => {
  render(<App />);

  // Check for the main title
  const titleElement = screen.getByText(/Resume Builder/i);
  expect(titleElement).toBeInTheDocument();

  // Check for section titles
  expect(
    screen.getByRole("heading", { name: /Experience/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Education/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Skills/i })).toBeInTheDocument();

  // Check for some buttons
  expect(
    screen.getByRole("button", { name: /Add Experience/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Add Education/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Add Skill/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Export/i })).toBeInTheDocument();
});

// User component test
describe("User Component", () => {
  test("renders Add User button", () => {
    render(<User />);
    const addButton = screen.getByRole("button", { name: /Add User/i });
    expect(addButton).toBeInTheDocument();
  });

  test("opens modal when Add User button is clicked", async () => {
    render(<User />);
    const addButton = screen.getByRole("button", { name: /Add User/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  test("closes modal when close button is clicked", async () => {
    render(<User />);
    const addButton = screen.getByRole("button", { name: /Add User/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      const closeButton = screen.getByRole("button", { name: /×/i });
      fireEvent.click(closeButton);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  test("closes modal when clicking outside", async () => {
    render(<User />);
    const addButton = screen.getByRole("button", { name: /Add User/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      const modal = screen.getByRole("dialog");
      fireEvent.mouseDown(document.body);
      expect(modal).not.toBeInTheDocument();
    });
  });

  test("handles form input and submission", async () => {
    render(<User />);
    const addButton = screen.getByRole("button", { name: /Add User/i });

    fireEvent.click(addButton);

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(/name/i);
      const phoneInput = screen.getByPlaceholderText(/phone/i);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const submitButton = screen.getByRole("button", { name: /save/i });

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(phoneInput, { target: { value: "+2343456890" } });
      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });

      expect(nameInput).toHaveValue("John Doe");
      expect(phoneInput).toHaveValue("+2343456890");
      expect(emailInput).toHaveValue("johndoe@example.com");

      const consoleSpy = jest.spyOn(console, "log");
      fireEvent.click(submitButton);

      expect(consoleSpy).toHaveBeenCalledWith({
        name: "John Doe",
        phone_number: "+2343456890",
        email: "johndoe@example.com",
      });
      consoleSpy.mockRestore();

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
