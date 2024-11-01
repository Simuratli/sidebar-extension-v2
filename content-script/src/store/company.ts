import { StateCreator } from "zustand";
import { BackendCompanyInterface } from "../api/api.types";

export interface CompanyState {
  name: string | undefined;
  numberofemployees: number;
  companySize: number | undefined;
  uds_linkedincompanyid: string | null | undefined;
  websiteurl: string | null | undefined;
  companyAddress1_name: string | undefined;
  uds_linkedinprofilecompanyurl: string;
  companyImage: string | null | undefined;
  companyDescription: string | null;
  companyBackData: BackendCompanyInterface | null;
  companyBackDataForSelect: BackendCompanyInterface | null;
  companyBackDataWithNames: BackendCompanyInterface[] | null;
  uds_salesnavigatorcompanyurl: string | null | undefined;
  accountid: string;
  setCompanyName: (value: string | undefined) => void;
  setAccountid: (value: string | undefined | null) => void;
  setNumberOfEmployees: (value: number | null) => void;
  setLinkedinCompanyId: (value: string | null | undefined) => void;
  setCompanyWebsiteUrl: (value: string | undefined | null) => void;
  setCompanyAdress: (value: string | undefined) => void;
  setSalesNavigatorCompanyUrl: (value: string) => void;
  setCompanyProfileUrl: (value: string) => void;
  setCompanyProfileImage: (value: string | null | undefined) => void;
  setCompanySize: (value: number | undefined) => void;
  setCompanyDescription: (value: string | null) => void;
  setCompanyBackendDataForSelect: (
    value: BackendCompanyInterface | null,
  ) => void;
  setCompanyBackendData: (value: BackendCompanyInterface | null) => void;
  setCompanyBackendDataWithNames: (
    value: BackendCompanyInterface[] | null,
  ) => void;
  setResetCompany: () => void;
}

export const useCompanyState: StateCreator<CompanyState> = (set) => ({
  name: "",
  companyBackData: null,
  companyBackDataForSelect: null,
  companyBackDataWithNames: null,
  numberofemployees: 0,
  uds_linkedincompanyid: "",
  websiteurl: "",
  companyAddress1_name: "",
  uds_linkedinprofilecompanyurl: "",
  companyImage: "",
  companySize: 0,
  companyDescription: "",
  uds_salesnavigatorcompanyurl: "",
  accountid: "",
  setCompanyName: (value) => set({ name: value?.trim() }),
  setCompanyDescription: (value) => set({ companyDescription: value }),
  setAccountid: (value) => set({ accountid: value || "" }),
  setNumberOfEmployees: (value) =>
    set({ numberofemployees: typeof value === "number" ? value : 0 }),
  setLinkedinCompanyId: (value) => set({ uds_linkedincompanyid: value }),
  setCompanyWebsiteUrl: (value) => set({ websiteurl: value }),
  setCompanySize: (value) => set({ companySize: value }),
  setCompanyAdress: (value) => set({ companyAddress1_name: value }),
  setResetCompany: () =>
    set({
      name: "",
      companyBackData: null,
      companyBackDataWithNames: null,
      numberofemployees: 0,
      uds_linkedincompanyid: "",
      websiteurl: "",
      companyAddress1_name: "",
      uds_linkedinprofilecompanyurl: "",
      companyImage: "",
      companySize: 0,
      companyDescription: "",
      uds_salesnavigatorcompanyurl: "",
      accountid: "",
    }),
  setCompanyProfileUrl: (value) =>
    set({ uds_linkedinprofilecompanyurl: value }),
  setSalesNavigatorCompanyUrl: (value) =>
    set({ uds_salesnavigatorcompanyurl: value }),
  setCompanyProfileImage: (value) => set({ companyImage: value }),
  setCompanyBackendData: (value) => set({ companyBackData: value }),
  setCompanyBackendDataForSelect: (value) =>
    set({ companyBackDataForSelect: value }),
  setCompanyBackendDataWithNames: (value) =>
    set({ companyBackDataWithNames: value }),
});
