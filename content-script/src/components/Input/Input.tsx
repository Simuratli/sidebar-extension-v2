/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "../../style/component/input.scss";
import { INPUT_TYPES } from "../../types/global.types";
import { InputPropTypes } from "./Input.types";
import { CancelIcon, PasteIcon, LockIcon, EditableIcon } from "../../assets";
import { useInput } from "../../hooks/useInput";
function Input({
  name,
  onChange,
  placeholder,
  value,
  type,
  id,
  onClear,
  readonly,
  error,
  required,
  height,
  onPaste,
  inputType = "text",
  style,
  ...props
}: InputPropTypes) {
  const { focus, handleFocus, handlePaste } = useInput(value);
  return (
    <div>
      <div
        style={style}
        className={`form__control ${type} ${focus && "active"} `}
      >
        <input
          id={id}
          style={{ height: height ? height : "auto" }}
          name={name}
          onChange={onChange}
          value={value}
          className={`input ${error && "error"}`}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(value ? true : value === 0 ? true : false)}
          placeholder={type === INPUT_TYPES.WITH_LABEL ? "" : placeholder}
          readOnly={readonly}
          type={inputType}
          {...props}
        />
        <label htmlFor={id} className="form__control__label">
          {type === INPUT_TYPES.WITH_LABEL ? (
            <>
              {placeholder} {required && <span className="required">*</span>}
            </>
          ) : (
            ""
          )}
        </label>
        {type === INPUT_TYPES.WITH_LABEL && (
          <>
            {!value && (
              <button
                onClick={async () => {
                  onPaste && onPaste(await handlePaste());
                }}
                className="form__control__button"
              >
                <PasteIcon />
              </button>
            )}
            {readonly ? (
              <button className="form__control__readonly">
                <LockIcon />
              </button>
            ) : value ? (
              required ? (
                <></>
              ) : (
                <button onClick={onClear} className="form__control__cancel">
                  <CancelIcon />
                </button>
              )
            ) : (
              <></>
            )}
          </>
        )}

        {type === INPUT_TYPES.IN_TABLE && !readonly && focus ? (
          <span className="editableIcon">
            <EditableIcon />
          </span>
        ) : (
          <></>
        )}

        {value ? (
          <span className="form__control__tooltip">{value}</span>
        ) : (
          <></>
        )}
      </div>
      {error && <p className="form__control__error">{error}</p>}
    </div>
  );
}

export default Input;
