import React from "react";
import { Button, Input, TextArea } from "../../../components";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  INPUT_TYPES,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { useStore } from "../../../store";
import { InfoIcon, SuccessIcon } from "../../../assets";
import { useCompanyValidation } from "../../../hooks/useCompanyValidation";
import { useCreateCompany } from "../../../hooks/useCreateCompany";
import { openInCrm } from "../../../utils/openCrm.util";

const NotExistCompanySearch = () => {
  const {
    name,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    companyAddress1_name,
    companyDescription,
    crmUrl,
    setCompanyAdress,
    setCompanyName,
    nameError,
    companyAddress1_nameError,
    companyDescriptionError,
    isCompanyHaveError,
  } = useStore();
  const { createCompany, createdCompany, isCreated } = useCreateCompany();
  const { handleChange } = useCompanyValidation();

  const handlePaste = (value?: string | number | null, name?: string) => {
    handleChange({
      target: { name: name, value: value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      <div className="company__form">
        <div className="company__form__inputs">
          <Input
            id="uds_linkedinprofilecompanyurl"
            name="uds_linkedinprofilecompanyurl"
            type={INPUT_TYPES.WITH_LABEL}
            placeholder="Company profile link"
            value={
              uds_linkedinprofilecompanyurl
                ? uds_linkedinprofilecompanyurl
                : uds_salesnavigatorcompanyurl || ""
            }
            readonly
            required
          />

          <Input
            id="name"
            type={INPUT_TYPES.WITH_LABEL}
            name="name"
            onChange={handleChange}
            placeholder="Company name"
            value={name}
            onClear={() => {
              setCompanyName("");
            }}
            error={nameError}
            required
            onPaste={async (e) => {
              handlePaste(e ? e : name, "name");
            }}
          />
          <Input
            id="companyAddress1_name"
            type={INPUT_TYPES.WITH_LABEL}
            name="companyAddress1_name"
            onChange={handleChange}
            placeholder="Company address"
            value={companyAddress1_name}
            onClear={() => {
              setCompanyAdress("");
            }}
            error={companyAddress1_nameError}
            onPaste={async (e) => {
              handlePaste(e ? e : companyAddress1_name, "companyAddress1_name");
            }}
          />
        </div>
        <TextArea
          type={TEXTAREA_ENUM.NORMAL}
          onChange={handleChange}
          value={companyDescription}
          name="companyDescription"
          placeholder="Add comment"
          error={companyDescriptionError}
        />
      </div>
      <div className="company__footer">
        <div className="company__footer__text">
          <InfoIcon />
          <p>You can complete the empty fields yourself</p>
        </div>
        <div className="company__footer__buttonContainer">
          {isCreated ? (
            <>
              <p className="company__footer__success">
                <SuccessIcon />
                Success!
              </p>
              <Button
                className="company__captureButton"
                onClick={() => {
                  openInCrm(
                    crmUrl,
                    APP_LOCATION.COMPANY,
                    createdCompany?.accountid ? createdCompany?.accountid : "",
                  );
                }}
                text="Go to CRM"
                type={BUTTON_ENUM.GOLD}
              />
            </>
          ) : (
            <>
              <Button
                className="company__captureButton"
                onClick={createCompany}
                text="Capture"
                type={BUTTON_ENUM.GOLD}
                disabled={isCompanyHaveError}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotExistCompanySearch;
