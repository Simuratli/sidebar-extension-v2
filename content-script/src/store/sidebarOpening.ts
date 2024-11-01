import { StateCreator } from "zustand";

export interface SidebarStateType {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export const useSidebarOpen: StateCreator<SidebarStateType> = (set) => ({
  sidebarOpen: false,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
});
