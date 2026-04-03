import type { ButtonProps } from "../../types/interfaces";

const Button = ({
  className,
  label,
  children,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={["button", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children ?? label}
    </button>
  );
};

export default Button;
