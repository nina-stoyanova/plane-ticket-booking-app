export type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "date" | "email" | "number" | "password";
  placeholder?: string;
};

export default function Field(props: FieldProps) {
  const { id, label, type = "text", placeholder } = props;

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} className="input" placeholder={placeholder} />
    </div>
  );
}
