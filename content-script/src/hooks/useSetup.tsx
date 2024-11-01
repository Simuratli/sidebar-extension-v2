import { useStore } from "../store";
import { useState } from "react";
import { PAGE_ENUM } from "../types/global.types";
import pkceChallenge from "pkce-challenge";
export function useSetup() {
  const {
    setPage,
    clientId,
    crmUrl,
    tenantId,
    setClientId,
    setTenantId,
    setCrmUrl,
    setCodeChallenge,
    page,
  } = useStore();

  interface SetupErrorInterface {
    clientIdError: null | string;
    tenantIdError: null | string;
    crmUrlError: null | string;
  }

  const [setupError, setSetupError] = useState<SetupErrorInterface>({
    clientIdError: null,
    tenantIdError: null,
    crmUrlError: null,
  });
  const IdPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  const expression =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/i;
  const regex = new RegExp(expression);

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "clientId":
        setClientId(value);
        setSetupError((prev) => ({
          ...prev,
          clientIdError: value
            ? !IdPattern.test(e.target.value)
              ? "Not valid Client ID"
              : null
            : "Client ID is required!",
        }));
        break;
      case "tenantId":
        setTenantId(value);
        setSetupError((prev) => ({
          ...prev,
          tenantIdError: value
            ? !IdPattern.test(e.target.value)
              ? "Not valid Tenant ID"
              : null
            : "Tenant ID is required!",
        }));
        break;
      case "crmUrl":
        setCrmUrl(value);
        setSetupError((prev) => ({
          ...prev,
          crmUrlError: value
            ? !value.match(regex)
              ? "Not valid Crm URL"
              : null
            : "Crm URL is required!",
        }));
        break;
    }
  };

  const handleSetup = async () => {
    const challengeResponse = await pkceChallenge();
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("tenantId", tenantId);
    localStorage.setItem("crmUrl", crmUrl);
    localStorage.setItem("challenge", JSON.stringify(challengeResponse));
    setCodeChallenge(challengeResponse);
    setCrmUrl(crmUrl);
    setClientId(clientId);
    setTenantId(tenantId);
    setPage(PAGE_ENUM.LOGIN);
  };

  return {
    handleSetup,
    handleChangeCredentials,
    setupError,
  };
}
