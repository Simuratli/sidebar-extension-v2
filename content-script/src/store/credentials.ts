import { StateCreator } from "zustand";

export interface CredentialsState {
  clientId: string;
  tenantId: string;
  crmUrl: string;
  webApiEndpoint: string;
  errorForCredentials: string;
  setClientId: (value: string) => void;
  setTenantId: (value: string) => void;
  setErrorForCredentials: (value: string) => void;
  setCrmUrl: (value: string) => void;
}

export const useCredentialState: StateCreator<CredentialsState> = (set) => ({
  clientId: "",
  tenantId: "",
  crmUrl: "",
  webApiEndpoint: "",
  errorForCredentials: "",
  setClientId: (value) => set({ clientId: value }),
  setTenantId: (value: string) => set({ tenantId: value }),
  setErrorForCredentials: (value: string) =>
    set({ errorForCredentials: value }),
  setCrmUrl: (value: string) =>
    set({ crmUrl: value, webApiEndpoint: `${value}/api/data/v9.2` }),
});
