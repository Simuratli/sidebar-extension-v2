import { TEXTAREA_ENUM } from "../../types/global.types";

export interface TextareaPropTypes {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | null;
  placeholder?: string;
  onClear?: () => void;
  error?: string | null;
  type: TEXTAREA_ENUM;
  className?: string;
  readOnly?: boolean;
}
