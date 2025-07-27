import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
  expect(githubLink).toHaveAttribute("href", expect.stringContaining("https://github.com"));
  expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("https://linkedin.com"));
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  expect(screen.getByLabelText(/tech/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/art/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByLabelText(/tech/i)).not.toBeChecked();
  expect(screen.getByLabelText(/design/i)).not.toBeChecked();
  expect(screen.getByLabelText(/art/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.type(nameInput, "Natasha");
  await userEvent.type(emailInput, "natasha@example.com");

  expect(nameInput).toHaveValue("Natasha");
  expect(emailInput).toHaveValue("natasha@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const tech = screen.getByLabelText(/tech/i);
  const design = screen.getByLabelText(/design/i);
  const art = screen.getByLabelText(/art/i);

  await userEvent.click(tech);
  await userEvent.click(design);

  expect(tech).toBeChecked();
  expect(design).toBeChecked();
  expect(art).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText(/name/i), "Natasha");
  await userEvent.type(screen.getByLabelText(/email/i), "natasha@example.com");
  await userEvent.click(screen.getByLabelText(/tech/i));
  await userEvent.click(screen.getByText(/submit/i));

  const message = await screen.findByTestId("confirmation-message");

  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent(/natasha/i);
  expect(message).toHaveTextContent(/your interests/i);
  expect(message).toHaveTextContent(/tech/i); // this assumes "tech" appears in the message
});

