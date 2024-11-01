import { StateCreator } from "zustand";
import { BackendCompanyInterface } from "../api/api.types";

export interface SearchControlCompanyStateObject {
  companyName: string | undefined;
  description: string | null | undefined;
  location: string | undefined;
  url: string | undefined;
  id: string | undefined;
  image: string | undefined;
  exist: boolean | undefined | null;
  existedData: BackendCompanyInterface | undefined | null;
  companyId: string | null | undefined;
  numberOfEmployees: number | null | undefined;
}

export interface SearchControlCompanyState {
  searchControlCompanyData: SearchControlCompanyStateObject[];
  setSearchControlCompanyData: (
    data: SearchControlCompanyStateObject[],
  ) => void;
  setSearchControlCompanyDataOneByOne: (
    data: SearchControlCompanyStateObject,
  ) => void;
}

export const useSearchControlCompany: StateCreator<
  SearchControlCompanyState
> = (set) => ({
  searchControlCompanyData: [],
  setSearchControlCompanyData: (value: SearchControlCompanyStateObject[]) =>
    set({ searchControlCompanyData: value }),
  setSearchControlCompanyDataOneByOne: (
    value: SearchControlCompanyStateObject,
  ) =>
    set((state) => ({
      searchControlCompanyData: [...state.searchControlCompanyData, value],
    })),
});
