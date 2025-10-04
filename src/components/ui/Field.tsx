export type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "date" | "email" | "number" | "password";
  placeholder?: string;
  min?: string;
  required?: boolean;

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
  } = props;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="input"
        placeholder={placeholder}
        required={required}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        {...(min ? { min } : {})}
      />
    </div>
  );
}
