import React from "react";
import "../../style/content/setup.scss";
import { Header, Input, Button, TutorialButton } from "../../components";
import { useSetup } from "../../hooks/useSetup";
import { useStore } from "../../store";
import { BUTTON_ENUM, INPUT_TYPES } from "../../types/global.types";
function Login() {
  const { handleChangeCredentials, handleSetup, setupError } = useSetup();
  const { clientId, crmUrl, tenantId } = useStore();

  return (
    <section className="setup">
      <Header>
        Azure AD B2C application credentials <br /> to access Dynamics 365 CRM
      </Header>
      <div className="setup__form">
        <Input
          type={INPUT_TYPES.NORMAL}
          placeholder="Client ID"
          value={clientId}
          onChange={handleChangeCredentials}
          name="clientId"
          error={setupError.clientIdError}
        />
        <Input
          type={INPUT_TYPES.NORMAL}
          placeholder="Tenant ID"
          value={tenantId}
          onChange={handleChangeCredentials}
          name="tenantId"
          error={setupError.tenantIdError}
        />
        <Input
          type={INPUT_TYPES.NORMAL}
          placeholder="CRM URL"
          value={crmUrl}
          onChange={handleChangeCredentials}
          name="crmUrl"
          error={setupError.crmUrlError}
        />
      </div>
      <div className="setup__tutorial">
        <TutorialButton />
      </div>
      <div className="setup__footer">
        <Button
          type={BUTTON_ENUM.GOLD}
          disabled={
            Object.values(setupError).some(
              (value) => typeof value === "string",
            ) ||
            !crmUrl ||
            !tenantId ||
            !clientId
          }
          onClick={handleSetup}
          text="Set Up"
        />
      </div>
    </section>
  );
}

export default Login;
