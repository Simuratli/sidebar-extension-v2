import { INPUT_TYPES } from "../../types/global.types";

export interface InputPropTypes {
  placeholder?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: INPUT_TYPES;
  id?: string;
  onClear?: () => void;
  readonly?: boolean;
  error?: string | null;
  required?: boolean;
  height?: number;
  onPaste?: (e: string | null) => void;
  inputType?: "text" | "date" | "number";
  style?: {};
}
