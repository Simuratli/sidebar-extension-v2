import "../../style/component/button.scss";
import { ButtonPropTypes } from "./Button.types";
function Button({
  text,
  onClick,
  type,
  icon,
  className,
  disabled,
}: ButtonPropTypes) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${type} ${className}`}
    >
      {text}
      {icon}
    </button>
  );
}

export default Button;
