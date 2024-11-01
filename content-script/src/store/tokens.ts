import { StateCreator } from "zustand";

export interface TokensState {
  authToken: string;
  accessToken: string;
  refreshToken: string;
  setAuthToken: (value: string) => void;
  setAccessToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
}

export const useTokenState: StateCreator<TokensState> = (set) => ({
  authToken: "",
  accessToken: "",
  refreshToken: "",
  setAuthToken: (value) => set({ authToken: value }),
  setAccessToken: (value: string) => set({ accessToken: value }),
  setRefreshToken: (value: string) => set({ refreshToken: value }),
});
