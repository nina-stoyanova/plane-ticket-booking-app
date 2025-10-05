import { useState } from "react";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { validateField, validateForm, isFormValid } from "@/utils/validation";
import type { BookingFormErrors } from "@/utils/validation";

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

  const [errors, setErrors] = useState<BookingFormErrors>({});

  const resetForm = () => {
    setValues({
      firstName: "",
      lastName: "",
      departureAirportId: 0,
      arrivalAirportId: 0,
      departureDate: "",
      returnDate: "",
    });
    setErrors({});
  };

  const handleInput =
    (key: keyof BookingFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const isAirportField =
        key === "departureAirportId" || key === "arrivalAirportId";

      const processedValue = isAirportField
        ? Number(e.target.value)
        : e.target.value;

      const newValues = {
        ...values,
        [key]: processedValue as any,
      };

      setValues(newValues);

      const error = validateField(key, processedValue);
      setErrors((prev) => ({ ...prev, [key]: error }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(values);
    setErrors(formErrors);

    const isValid = isFormValid(formErrors);

    if (!isValid) {
      return;
    }

    onCreate?.(values);
    resetForm();
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <form
      className="form-grid"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <Field
        id="firstName"
        label="First name"
        placeholder="John"
        value={values.firstName}
        onChange={handleInput("firstName")}
        error={errors.firstName}
        required
      />

      <Field
        id="lastName"
        label="Last name"
        placeholder="Doe"
        value={values.lastName}
        onChange={handleInput("lastName")}
        error={errors.lastName}
        required
      />

      <Select
        id="dep"
        label="Departure airport"
        placeholder="Select departure"
        options={airports}
        value={values.departureAirportId > 0 ? values.departureAirportId : ""}
        onChange={handleInput("departureAirportId")}
        error={errors.departureAirportId}
        required
      />

      <Select
        id="arr"
        label="Arrival airport"
        placeholder="Select arrival"
        options={airports}
        value={values.arrivalAirportId > 0 ? values.arrivalAirportId : ""}
        onChange={handleInput("arrivalAirportId")}
        error={errors.arrivalAirportId}
        required
      />

      <Field
        id="d1"
        label="Departure date"
        type="date"
        value={values.departureDate}
        onChange={handleInput("departureDate")}
        min={new Date().toISOString().split("T")[0]}
        error={errors.departureDate}
        required
      />

      <Field
        id="d2"
        label="Return date"
        type="date"
        value={values.returnDate}
        onChange={handleInput("returnDate")}
        min={values.departureDate || new Date().toISOString().split("T")[0]}
        error={errors.returnDate}
        required
      />

      <div className="form-actions">
        <Button type="submit" label="Create booking" />
        <Button type="reset" label="Reset" onClick={handleReset} />
      </div>
    </form>
  );
}
