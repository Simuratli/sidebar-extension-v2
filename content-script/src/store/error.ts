import { StateCreator } from "zustand";

export interface ErrorStateType {
  errorText: string;
  setErrorText: (value: string) => void;
}

export const useErrorState: StateCreator<ErrorStateType> = (set) => ({
  errorText: "",
  setErrorText: (value) => set({ errorText: value }),
});
