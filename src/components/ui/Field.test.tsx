import { render, screen } from "@testing-library/react";
import Field from "./Field";

test("renders Field with label and placeholder", () => {
  render(<Field id="firstName" label="First name" placeholder="John" />);

  const input = screen.getByLabelText("First name");
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveAttribute("placeholder", "John");
});
