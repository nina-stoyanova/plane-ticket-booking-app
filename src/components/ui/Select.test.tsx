import { render, screen } from "@testing-library/react";
import Select from "./Select";

test("renders Select with label, placeholder, and option", () => {
  render(
    <Select
      id="dep"
      label="Departure"
      placeholder="Select departure"
      options={[{ value: 1, label: "SOF — Sofia" }]}
    />
  );

  const select = screen.getByLabelText("Departure");
  expect(select).toBeInTheDocument();
  expect(screen.getByText("Select departure")).toBeInTheDocument();
  expect(screen.getByText("SOF — Sofia")).toBeInTheDocument();
});
