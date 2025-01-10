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
export const useUserErrorState: StateCreator<userErrorState> = (set, get) => ({
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
    set((state) => {
      const updatedErrors = {
        ...state,
        [`${name}Error`]: error,
      };

      const currentErrorState = {
        telephone1Error: updatedErrors.telephone1Error,
        fullnameError: updatedErrors.fullnameError,
        birthdayError: updatedErrors.birthdayError,
        mobilephoneError: updatedErrors.mobilephoneError,
        jobtitleError: updatedErrors.jobtitleError,
        emailaddress1Error: updatedErrors.emailaddress1Error,
        userAddress1_nameError: updatedErrors.emailaddress1Error,
        emailaddress2Error: updatedErrors.emailaddress2Error,
        descriptionError: updatedErrors.descriptionError,
        // Add other errors if needed
      };

      const hasError = Object.values(currentErrorState).some(
        (value) => value !== null && typeof value === "string",
      );
      return {
        ...updatedErrors,
        isUserHaveError: hasError,
      };
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
