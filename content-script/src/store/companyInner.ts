import { StateCreator } from "zustand";
import { EXIST_PAGE_PAGINATION } from "../types/global.types";

export interface CompanyInnerState {
  companyPagination: EXIST_PAGE_PAGINATION | null;
  setCompanyPagination: (value: EXIST_PAGE_PAGINATION) => void;
}

export const useCompanyInnerState: StateCreator<CompanyInnerState> = (set) => ({
  companyPagination: null,
  setCompanyPagination: (value) => set({ companyPagination: value }),
});
