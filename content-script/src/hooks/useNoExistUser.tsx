/* eslint-disable no-case-declarations */
import React from "react";
import { useStore } from "../store";
import {
  datePattern,
  emailPattern,
  urlPattern,
  userValidators,
} from "../utils/companyValidators";
import { FIELD_TYPE, USER_FIELDS } from "../types/global.types";

export function useNoExistUser() {
  const {
    setFullname,
    setWorkPhone,
    setBirthday,
    setPersonalPhone,
    setJobTitle,
    setEmail,
    setUserAdress,
    setPersonalEmail,
    setDescription,
    setUserError,
  } = useStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const { min, max, type, required } = userValidators[name as USER_FIELDS];

    if (type === FIELD_TYPE.NUMBER && !isNaN(Number(value))) {
      setUserError(
        name,
        value
          ? (min && Number(value) < min) || Number(value) > max
            ? `Character limit: ${max}`
            : null
          : null,
      );
    } else if (type === FIELD_TYPE.EMAIL) {
      setUserError(
        name,
        value
          ? emailPattern.test(value)
            ? value.length > max
              ? `Character limit: ${max}`
              : null
            : "Not valid email"
          : null,
      );
    } else if (type === FIELD_TYPE.DATE) {
      if (value) {
        if (datePattern.test(value)) {
          const parts = value.split(".");
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);

          if (
            day >= 1 &&
            day <= 31 &&
            month >= 1 &&
            month <= 12 &&
            year >= 1000
          ) {
            setUserError(name, null);
          } else {
            setUserError(
              name,
              "Invalid date format. Please enter date in dd.mm.yyyy format.",
            );
          }
        } else {
          setUserError(
            name,
            "Invalid date format. Please enter date in dd.mm.yyyy format.",
          );
        }
      } else {
        setUserError(name, null);
      }
    } else if (type === FIELD_TYPE.URL) {
      setUserError(
        name,
        value ? (!urlPattern.test(value) ? "Not correct URL" : null) : null,
      );
    } else {
      setUserError(
        name,
        value.length > max
          ? `Character limit: ${max}`
          : required
            ? !value
              ? "Required field"
              : null
            : null,
      );
    }

    switch (name) {
      case USER_FIELDS.FULLNAME:
        setFullname(value);
        break;
      case USER_FIELDS.ADRESS:
        setUserAdress(value);
        break;
      case USER_FIELDS.BIRTHDAY:
        setBirthday(value);
        break;
      case USER_FIELDS.DESCRIPTION:
        setDescription(value);
        break;
      case USER_FIELDS.MOBILE_PHONE:
        setPersonalPhone(value);
        break;
      case USER_FIELDS.WORK_PHONE:
        setWorkPhone(value);
        break;
      case USER_FIELDS.PERSONAL_EMAIL:
        setEmail(value);
        break;
      case USER_FIELDS.EMAIL:
        setPersonalEmail(value);
        break;
      case USER_FIELDS.JOB_TITLE:
        setJobTitle(value);
        break;
      default:
        break;
    }
  };

  const handlePaste = (value?: string | number | null, name?: string) => {
    handleChange({
      target: { name: name, value: value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return {
    handleChange,
    handlePaste,
  };
}
