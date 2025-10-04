import { useState } from "react";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export type AirportOption = { value: number; label: string };

export type BookingFormValues = {
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
};

export type BookingFormProps = {
  airports: AirportOption[];
  onCreate?: (values: BookingFormValues) => void;
};

export default function BookingForm({ airports, onCreate }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>({
    firstName: "",
    lastName: "",
    departureAirportId: 0,
    arrivalAirportId: 0,
    departureDate: "",
    returnDate: "",
  });

  const handleInput =
    (key: keyof BookingFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const isAirportField =
        key === "departureAirportId" || key === "arrivalAirportId";

      const processedValue = isAirportField
        ? Number(e.target.value)
        : e.target.value;

      setValues((previousValues) => ({
        ...previousValues,
        [key]: processedValue as any,
      }));
    };

  const valid =
    values.firstName.trim() &&
    values.lastName.trim() &&
    values.departureAirportId > 0 &&
    values.arrivalAirportId > 0 &&
    values.departureDate &&
    values.returnDate &&
    values.departureDate <= values.returnDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!valid) {
      console.log("Form validation failed, not submitting");
      return;
    }

    onCreate?.(values);

    setValues({
      firstName: "",
      lastName: "",
      departureAirportId: 0,
      arrivalAirportId: 0,
      departureDate: "",
      returnDate: "",
    });
  };

  const handleReset = () => {
    setValues({
      firstName: "",
      lastName: "",
      departureAirportId: 0,
      arrivalAirportId: 0,
      departureDate: "",
      returnDate: "",
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Field
        id="firstName"
        label="First name"
        placeholder="John"
        value={values.firstName}
        onChange={handleInput("firstName")}
        required
      />

      <Field
        id="lastName"
        label="Last name"
        placeholder="Doe"
        value={values.lastName}
        onChange={handleInput("lastName")}
        required
      />

      <Select
        id="dep"
        label="Departure airport"
        placeholder="Select departure"
        options={airports}
        value={values.departureAirportId || ""}
        onChange={handleInput("departureAirportId")}
        required
      />

      <Select
        id="arr"
        label="Arrival airport"
        placeholder="Select arrival"
        options={airports}
        value={values.arrivalAirportId || ""}
        onChange={handleInput("arrivalAirportId")}
        required
      />

      <Field
        id="d1"
        label="Departure date"
        type="date"
        value={values.departureDate}
        onChange={handleInput("departureDate")}
        min={new Date().toISOString().split("T")[0]}
        required
      />

      <Field
        id="d2"
        label="Return date"
        type="date"
        value={values.returnDate}
        onChange={handleInput("returnDate")}
        min={values.departureDate || new Date().toISOString().split("T")[0]}
        required
      />

      <div className="form-actions">
        <Button type="submit" label="Create booking" />
        <Button type="reset" label="Reset" onClick={handleReset} />
      </div>
    </form>
  );
}
