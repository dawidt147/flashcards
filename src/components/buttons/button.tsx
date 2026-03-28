import { ButtonProps } from "../../types/interfaces";

const Button: React.FC<ButtonProps> = ({
  id,
  label,
  type,
  name,
  value,
  className,
}) => {
  return (
    <button
      id={id}
      type={type}
      name={name}
      value={value}
      className={`button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
