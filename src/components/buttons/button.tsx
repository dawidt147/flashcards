import type { ButtonProps } from "@/types/interfaces";

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
      className={["button py-1 px-4 rounded-3xl", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children ?? label}
    </button>
  );
};

export default Button;
