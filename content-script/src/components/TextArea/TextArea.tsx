import React from "react";
import { TextareaPropTypes } from "./Textarea.types";
import "../../style/component/textarea.scss";
import { useInput } from "../../hooks/useInput";
import { TEXTAREA_ENUM } from "../../types/global.types";

function TextArea({
  name,
  onChange,
  value,
  placeholder,
  error,
  type,
  className,
  readOnly,
}: TextareaPropTypes) {
  const { focus, handleFocus } = useInput(value);

  return (
    <div>
      <div
        className={`textarea__control ${focus && "active"} ${type} ${className} ${error && "haveError"}`}
      >
        <textarea
          readOnly={readOnly}
          id="texarea"
          className={`textarea ${error && "error"}`}
          name={name}
          placeholder={type === TEXTAREA_ENUM.IN_TABLE ? placeholder : " "}
          onChange={onChange}
          value={value ? value : ""}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(!!value)}
        />
        {type === TEXTAREA_ENUM.NORMAL && (
          <label className="textarea__control__label" htmlFor="texarea">
            {placeholder}
          </label>
        )}
      </div>
      <p className="form__control__error">{error}</p>
    </div>
  );
}

export default TextArea;
