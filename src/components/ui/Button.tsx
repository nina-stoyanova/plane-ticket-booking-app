export type ButtonProps = {
  type: "submit" | "reset" | "delete";
  label: string;
};

const buttonTypeToClass = {
  submit: "btn btn--primary",
  reset: "btn",
  delete: "btn btn--danger",
};

const buttonTypeToNativeType: Record<
  ButtonProps["type"],
  "submit" | "reset" | "button"
> = {
  submit: "submit",
  reset: "reset",
  delete: "button",
};

export default function Button(props: ButtonProps) {
  const { type, label } = props;

  const classes = buttonTypeToClass[type];

  return (
    <button className={classes} type={buttonTypeToNativeType[type]}>
      {label}
    </button>
  );
}
