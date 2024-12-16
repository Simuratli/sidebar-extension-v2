import { StateCreator } from "zustand";
import { ProfileData } from "../../../background/background";

export interface ProfileBackgroundTypes {
  profileBackground: ProfileData | null;
  setProfileBackground: (page: ProfileData | null) => void;
}

export const useProfileBackround: StateCreator<ProfileBackgroundTypes> = (
  set,
) => ({
  profileBackground: null,
  setProfileBackground: (data) => set({ profileBackground: data }),
});
