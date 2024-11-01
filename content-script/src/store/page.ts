import { StateCreator } from "zustand";
import { PAGE_ENUM } from "../types/global.types";

export interface PageState {
  page: PAGE_ENUM;
  setPage: (page: PAGE_ENUM) => void;
}

export const usePageState: StateCreator<PageState> = (set) => ({
  page: PAGE_ENUM.SETUP,
  setPage: (page) => set({ page: page }),
});
