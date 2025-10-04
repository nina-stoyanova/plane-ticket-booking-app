export type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "date" | "email" | "number" | "password";
  placeholder?: string;
  min?: string;
  required?: boolean;
  error?: string;

  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Field(props: FieldProps) {
  const {
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    min,
    required,
    error,
  } = props;

  const className = `input ${error ? "input--error" : ""}`;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        min={min}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
