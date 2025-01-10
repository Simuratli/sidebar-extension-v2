import { StateCreator } from "zustand";
import { BackendUserInterface } from "../api/api.types";
import { fixUserLinkedinUrl } from "../utils/fixUrl.util";
import { SearchControlStateObject } from "./searchControl";
export interface UserStoreType {
  fullname: string;
  firstname: string;
  lastname: string;
  uds_linkedin: string;
  uds_salesnavigatoruserurl: string;
  userAddress1_name: string;
  jobtitle: string;
  telephone1: string;
  mobilephone: string;
  emailaddress1: string;
  description: string;
  emailaddress2: string;
  birthday: string;
  customer: string;
  customerId: string;
  userProfileImage: string | null;
  userBackendData: BackendUserInterface | null;
  userBackendDataWithNames: BackendUserInterface[] | null;
  dataForReloadSearchingUser: null | SearchControlStateObject;
  setDataForReloadingUser: (e?: SearchControlStateObject) => void;
  setFullname: (e?: string | null) => void;
  setDescription: (e?: string | null) => void;
  setUserProfileImage: (e?: string | null) => void;
  setUserLinkedin: (e: string) => void;
  setUserSales: (e: string) => void;
  setJobTitle: (e?: string | null) => void;
  setUserAdress: (e?: string | null) => void;
  setWorkPhone: (e?: string | null) => void;
  setPersonalPhone: (e?: string | null) => void;
  setPersonalEmail: (e?: string | null) => void;
  setEmail: (e?: string | null) => void;
  setBirthday: (e?: string | null) => void;
  setCustomer: (e?: string | null) => void;
  setCustomerId: (e?: string | null) => void;
  setUserBackendData: (e?: BackendUserInterface | null) => void;
  setUserBackendDataWithNames: (e?: BackendUserInterface[] | null) => void;
  setResetUser: () => void;
}

export const useUserStore: StateCreator<UserStoreType> = (set) => ({
  fullname: "",
  firstname: "",
  lastname: "",
  uds_linkedin: "",
  uds_salesnavigatoruserurl: "",
  userAddress1_name: "",
  jobtitle: "",
  telephone1: "",
  mobilephone: "",
  emailaddress1: "",
  emailaddress2: "",
  birthday: "",
  customer: "",
  description: "",
  customerId: "",
  userBackendData: null,
  userBackendDataWithNames: null,
  userProfileImage: "",
  dataForReloadSearchingUser: null,
  setFullname: (value) =>
    set({
      fullname: value ? value : "",
      firstname: value ? value.split(" ")[0] : "",
      lastname: value
        ? value
            .split(" ")
            .filter((_, i) => i > 0)
            .join(" ")
            .trim()
            .replace(/\s+/g, " ")
        : "",
    }),
  setUserLinkedin: (value) =>
    set({ uds_linkedin: fixUserLinkedinUrl(value || "") }),
  setCustomerId: (value) => set({ customerId: value || "" }),
  setResetUser: () =>
    set({
      fullname: "",
      firstname: "",
      lastname: "",
      uds_linkedin: "",
      uds_salesnavigatoruserurl: "",
      userAddress1_name: "",
      jobtitle: "",
      telephone1: "",
      mobilephone: "",
      emailaddress1: "",
      emailaddress2: "",
      birthday: "",
      customer: "",
      description: "",
      customerId: "",
      userBackendData: null,
      userBackendDataWithNames: null,
    }),
  setUserSales: (value) => set({ uds_salesnavigatoruserurl: value }),
  setJobTitle: (value) => set({ jobtitle: value || "" }),
  setUserAdress: (value) => set({ userAddress1_name: value || "" }),
  setWorkPhone: (value) => set({ telephone1: value || "" }),
  setPersonalPhone: (value) => set({ mobilephone: value || "" }),
  setEmail: (value) => set({ emailaddress2: value || "" }),
  setUserProfileImage: (value) => set({ userProfileImage: value }),
  setPersonalEmail: (value) => set({ emailaddress1: value || "" }),
  setBirthday: (value) => set({ birthday: value || "" }),
  setCustomer: (value) => set({ customer: value || "" }),
  setDescription: (value) => set({ description: value || "" }),
  setUserBackendDataWithNames: (value) =>
    set({ userBackendDataWithNames: value }),
  setUserBackendData: (value) => set({ userBackendData: value }),
  setDataForReloadingUser: (value) =>
    set({ dataForReloadSearchingUser: value }),
});
