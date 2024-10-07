import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import App from "./App";
import User from "./components/User/page.jsx";

/*
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
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
