import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

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
