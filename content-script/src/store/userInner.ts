import { StateCreator } from "zustand";
import { EXIST_PAGE_PAGINATION } from "../types/global.types";

export interface UserInnerState {
  userPagination: EXIST_PAGE_PAGINATION | null;
  setUserPagination: (value: EXIST_PAGE_PAGINATION) => void;
}

export const useUserInnerState: StateCreator<UserInnerState> = (set) => ({
  userPagination: null,
  setUserPagination: (value) => set({ userPagination: value }),
});
