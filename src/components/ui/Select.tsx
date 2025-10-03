export type SelectOption = { value: string | number; label: string };

export type SelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export default function Select(props: SelectProps) {
  const { id, label, options, placeholder } = props;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select id={id} className="select">
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
