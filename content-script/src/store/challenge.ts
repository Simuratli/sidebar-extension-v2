import { StateCreator } from "zustand";

export interface ChallengeType {
  code_verifier: string;
  code_challenge: string;
}
export interface ChallengeState {
  code_verifier: string;
  code_challenge: string;
  setCodeChallenge: (e: ChallengeType) => void;
}

export const useChallengeState: StateCreator<ChallengeState> = (set) => ({
  code_verifier: "",
  code_challenge: "",
  setCodeChallenge: (value: ChallengeType) =>
    set({
      code_challenge: value.code_challenge,
      code_verifier: value.code_verifier,
    }),
});
