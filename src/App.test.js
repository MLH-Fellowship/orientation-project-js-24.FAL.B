import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import User from "./components/User/page.jsx";
import ExperienceForm from "./components/experience/ExperienceForm.js";
import ViewExperience from "./components/experience/ViewExperience.js";

// App component test
/*
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
*/
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

//experience test cases

describe("ExperienceForm", () => {
  const mockSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  beforeEach(() => {
    render(<ExperienceForm onSubmit={mockSubmit} onCancel={mockOnCancel} />);
  });

  test("renders Experience Form correctly", () => {
    // Check if the form fields are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/logo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current job/i)).toBeInTheDocument();
  });

  test("allows user to input job title", () => {
    const jobTitleInput = screen.getByLabelText(/title/i);
    fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
    expect(jobTitleInput.value).toBe("Software Engineer");
  });
  test("allows user to input company name", () => {
    const companyNameInput = screen.getByLabelText(/company/i);
    fireEvent.change(companyNameInput, { target: { value: "Tech Corp" } });
    expect(companyNameInput.value).toBe("Tech Corp");
  });

  test('updates end date to "Present" when current job is checked', async () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Tech Corp" },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2022-01-01" },
    });

    expect(screen.getByLabelText(/end date/i).value).toBe("");

    const currentJobCheckbox = screen.getByLabelText(/current job/i);
    fireEvent.click(currentJobCheckbox);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        end_date: "Present",
      }),
    );
  });

  test("resets end date when current job checkbox is toggled", async () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Tech Corp" },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2022-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2023-01-01" },
    });

    const currentJobCheckbox = screen.getByLabelText(/current job/i);
    fireEvent.click(currentJobCheckbox); // Check it to set current job

    expect(screen.getByLabelText(/end date/i).value).toBe("");

    fireEvent.click(currentJobCheckbox);

    expect(screen.getByLabelText(/end date/i)).not.toBeDisabled();
  });

  test("calls onCancel when Cancel button is clicked", () => {
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("does not call onSubmit when end date is invalid", async () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Tech Corp" },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2022-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
