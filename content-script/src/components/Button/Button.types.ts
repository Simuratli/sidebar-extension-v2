import { BUTTON_ENUM } from "../../types/global.types";

export interface ButtonPropTypes {
  text?: string;
  onClick: () => void;
  type: BUTTON_ENUM;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
