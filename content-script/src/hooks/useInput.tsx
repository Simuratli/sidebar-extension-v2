import { useState, useEffect } from "react";

export function useInput(value: string | number | undefined | null) {
  const [focus, handleFocus] = useState(false);
  const [focusForEditableIcon, handleFocusForEditableIcon] = useState(false);

  useEffect(() => {
    handleFocus(!!value);
  }, [value]);

  const handlePaste: () => Promise<string | null> = async () => {
    const text = await navigator.clipboard.readText();
    if (text) return text;
    return null;
  };

  return {
    focus,
    handleFocus,
    handlePaste,
    focusForEditableIcon,
    handleFocusForEditableIcon,
  };
}
