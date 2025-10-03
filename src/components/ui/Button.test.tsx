import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders the label for submit", () => {
    render(<Button type="submit" label="Create booking" />);
    expect(
      screen.getByRole("button", { name: /create booking/i })
    ).toBeInTheDocument();
  });

  it("renders the label for reset", () => {
    render(<Button type="reset" label="Reset form" />);
    expect(
      screen.getByRole("button", { name: /reset form/i })
    ).toBeInTheDocument();
  });

  it("renders the label for delete", () => {
    render(<Button type="delete" label="Remove" />);
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });
});
