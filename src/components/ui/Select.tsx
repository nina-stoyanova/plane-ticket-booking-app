export type SelectOption = { value: string | number; label: string };

export type SelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;

  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function Select(props: SelectProps) {
  const { id, label, options, placeholder, value, onChange, required } = props;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="select"
        required={required}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
