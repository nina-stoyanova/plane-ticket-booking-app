export type ButtonProps = {
  type: "submit" | "reset" | "delete" | "view";
  label: string;
  onClick?: () => void;
};

const buttonTypeToClass = {
  submit: "btn btn--primary",
  reset: "btn",
  delete: "btn btn--danger",
  view: "btn btn--view",
};

const buttonTypeToNativeType: Record<
  ButtonProps["type"],
  "submit" | "reset" | "button"
> = {
  submit: "submit",
  reset: "reset",
  delete: "button",
  view: "button",
};

export default function Button(props: ButtonProps) {
  const { type, label, onClick } = props;

  const classes = buttonTypeToClass[type];

  return (
    <button
      className={classes}
      type={buttonTypeToNativeType[type]}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
