import { StateCreator } from "zustand";
import {
  BackendCompanyInterface,
  BackendUserInterface,
} from "../api/api.types";

export interface SearchControlStateObject {
  userName: string | undefined;
  job: string | undefined;
  location: string | undefined;
  url: string | undefined;
  id: string | undefined;
  image: string | undefined;
  exist: boolean | undefined | null;
  existedData: BackendUserInterface | undefined | null;
  existedUsersCompanyData: BackendCompanyInterface | null;
}

export interface SearchControlState {
  searchControlData: SearchControlStateObject[];
  setSearchControlData: (data: SearchControlStateObject[]) => void;
  setSearchControlDataOneByOne: (data: SearchControlStateObject) => void;
}

export const useSearchControl: StateCreator<SearchControlState> = (set) => ({
  searchControlData: [],
  setSearchControlData: (value: SearchControlStateObject[]) =>
    set({ searchControlData: value }),
  setSearchControlDataOneByOne: (value: SearchControlStateObject) =>
    set((state) => ({
      searchControlData: [...state.searchControlData, value],
    })),
});
