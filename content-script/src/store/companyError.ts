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
    set((state)=>{
      const updatedErrors = {
        ...state,
        [`${name}Error`]: error,
      };

      const currentErrorState = {
        nameError: updatedErrors.nameError,
        numberofemployeesError:  updatedErrors.numberofemployeesError,
        uds_linkedinprofilecompanyurlError: updatedErrors.uds_linkedinprofilecompanyurlError,
        companyAddress1_nameError: updatedErrors.companyAddress1_nameError,
        companySizeError:  updatedErrors.companySizeError,
        websiteurlError: updatedErrors.websiteurlError,
        companyDescriptionError:  updatedErrors.companyDescriptionError,
        // Add other errors if needed
      };


      const hasError = Object.values(currentErrorState).some(
        (value) => value !== null && typeof value === "string",
      );

     return {
        ...updatedErrors,
        isCompanyHaveError: hasError,
      };
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
