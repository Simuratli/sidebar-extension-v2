import { StateCreator } from "zustand";

export interface userErrorState {
  fullnameError: null | string;
  telephone1Error: null | string;
  birthdayError: null | string;
  mobilephoneError: null | string;
  jobtitleError: null | string;
  emailaddress1Error: null | string;
  userAddress1_nameError: null | string;
  emailaddress2Error: null | string;
  descriptionError: null | string;
  isUserHaveError: boolean;
  setUserError: (name: string, value: string | null) => void;
  setResetUserError: () => void;
}

export const useUserErrorState: StateCreator<userErrorState> = (set) => ({
  fullnameError: null,
  telephone1Error: null,
  birthdayError: null,
  mobilephoneError: null,
  jobtitleError: null,
  emailaddress1Error: null,
  userAddress1_nameError: null,
  emailaddress2Error: null,
  descriptionError: null,
  isUserHaveError: false,
  setUserError: (name, error) =>
    set({
      [`${name}Error`]: error,
      isUserHaveError: typeof error === "string",
    }),
  setResetUserError: () =>
    set({
      fullnameError: null,
      telephone1Error: null,
      birthdayError: null,
      mobilephoneError: null,
      jobtitleError: null,
      emailaddress1Error: null,
      userAddress1_nameError: null,
      emailaddress2Error: null,
      descriptionError: null,
      isUserHaveError: false,
    }),
});
