import { StateCreator } from "zustand";

export interface companyErrorState {
  nameError: null | string;
  numberofemployeesError: null | string;
  uds_linkedinprofilecompanyurlError: null | string;
  companyAddress1_nameError: null | string;
  companySizeError: null | string;
  websiteurlError: null | string;
  companyDescriptionError: null | string;
  isCompanyHaveError: boolean;
  setCompanyError: (name: string, value: string | null) => void;
  setResetCompanyError: () => void;
}

export const useCompanyErrorState: StateCreator<companyErrorState> = (set) => ({
  nameError: null,
  numberofemployeesError: null,
  uds_linkedinprofilecompanyurlError: null,
  companyAddress1_nameError: null,
  companySizeError: null,
  websiteurlError: null,
  isCompanyHaveError: false,
  companyDescriptionError: null,
  setCompanyError: (name, error) =>
    set({
      [`${name}Error`]: error,
      isCompanyHaveError: typeof error === "string",
    }),
  setResetCompanyError: () =>
    set({
      nameError: null,
      numberofemployeesError: null,
      uds_linkedinprofilecompanyurlError: null,
      companyAddress1_nameError: null,
      companySizeError: null,
      websiteurlError: null,
      isCompanyHaveError: false,
      companyDescriptionError: null,
    }),
});
