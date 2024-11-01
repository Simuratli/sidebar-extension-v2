import React from "react";
import { ControlIcon, QuickFetchIcon, RedirectIcon } from "../../assets";
import { useStore } from "../../store";
import { APP_LOCATION, CONTROL_ICONS_TYPE } from "../../types/global.types";
import { CompanySearchControlType } from "./ControlButton.types";
import { BackendCompanyInterface } from "../../api/api.types";
import { openInCrm } from "../../utils/openCrm.util";
import { useCompanySearchControlButton } from "../../hooks/useCompanySearchControlButton";

function CompanySearchControlButton({
  url,
  image,
  description,
  location,
  name,
  id,
  numberOfEmployees,
}: CompanySearchControlType) {
  const {
    setQuickShowCaptureDetail,
    setShowMainInfoDetail,
    showMainInfoDetail,
    showQuickCaptureDetail,
    handleClickQuickFetchCompany,
    handleClickCompanyControl,
  } = useCompanySearchControlButton(
    url || "",
    image || "",
    description || "",
    location || "",
    name || "",
    id || "",
    numberOfEmployees || 0,
  );

  const { crmUrl, accessToken, searchControlCompanyData } = useStore();

  return (
    <div className="controlIcon__holder">
      <div
        onMouseEnter={() => {
          setShowMainInfoDetail(true);
        }}
        onMouseLeave={() => {
          setShowMainInfoDetail(false);
        }}
        className="iconHolder contorlIcon"
      >
        <ControlIcon
          type={
            accessToken
              ? searchControlCompanyData.filter(
                  (data) => data.id === image,
                )[0] &&
                searchControlCompanyData.filter((data) => data.id === image)[0]
                  .exist
                ? CONTROL_ICONS_TYPE.CAPTURE_EXIST
                : CONTROL_ICONS_TYPE.CAPTURE_NOEXIST
              : CONTROL_ICONS_TYPE.LOGIN
          }
          onClick={handleClickCompanyControl}
        />
        {showMainInfoDetail && (
          <span className="iconHoverDetail">
            {accessToken
              ? searchControlCompanyData.filter(
                  (data) => data.id === image,
                )[0] &&
                searchControlCompanyData.filter((data) => data.id === image)[0]
                  .exist
                ? "Contact already exists in CRM."
                : "Capture Contact into CRM."
              : "Login to LinkedIn extension"}
          </span>
        )}
      </div>
      {accessToken &&
        (searchControlCompanyData.filter((data) => data.id === image)[0] &&
        !searchControlCompanyData.filter((data) => data.id === image)[0]
          .exist ? (
          <div
            onMouseEnter={() => {
              setQuickShowCaptureDetail(true);
            }}
            onMouseLeave={() => {
              setQuickShowCaptureDetail(false);
            }}
            className="iconHolder"
          >
            <QuickFetchIcon onClick={handleClickQuickFetchCompany} />
            {showQuickCaptureDetail && (
              <span className="iconHoverDetail">Quick capture</span>
            )}
          </div>
        ) : (
          <div
            onMouseEnter={() => {
              setQuickShowCaptureDetail(true);
            }}
            onMouseLeave={() => {
              setQuickShowCaptureDetail(false);
            }}
            className="iconHolder"
          >
            <RedirectIcon
              onClick={() => {
                const existedData: BackendCompanyInterface | null | undefined =
                  searchControlCompanyData.filter(
                    (data) => data.id === image,
                  )[0].existedData;
                const accountid = existedData ? existedData.accountid : "";
                openInCrm(crmUrl, APP_LOCATION.COMPANY, accountid);
              }}
            />
            {showQuickCaptureDetail && (
              <span className="iconHoverDetail">Redirect to Contact</span>
            )}
          </div>
        ))}
    </div>
  );
}

export default CompanySearchControlButton;
