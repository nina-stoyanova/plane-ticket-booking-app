import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the main heading and info text", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Booking app/i })
    ).toBeInTheDocument();
  });
});
