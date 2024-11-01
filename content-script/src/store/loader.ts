import { StateCreator } from "zustand";

export interface LoaderStateType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useLoadingState: StateCreator<LoaderStateType> = (set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
});
