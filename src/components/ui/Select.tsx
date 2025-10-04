export type SelectOption = { value: string | number; label: string };

export type SelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;

  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function Select(props: SelectProps) {
  const { id, label, options, placeholder, value, onChange, required, error } =
    props;

  const className = `select ${error ? "select--error" : ""}`;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={className}
        required={required}
        value={value}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
