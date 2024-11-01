import React, { useEffect, useState } from "react";
import { PeopleSearchControlType } from "./ControlButton.types";
import { ControlIcon, QuickFetchIcon, RedirectIcon } from "../../assets";
import { APP_LOCATION, CONTROL_ICONS_TYPE } from "../../types/global.types";
import { useStore } from "../../store";
import { checkIfUserExistOrNotSearch } from "../../utils/userSearch";
import { BackendUserInterface } from "../../api/api.types";
import { openInCrm } from "../../utils/openCrm.util";
import "../../style/component/control.scss";
import { useUserSearchControlButton } from "../../hooks/useUserSearchControlButton";

const UserSearchControlButton = ({
  image,
  job,
  location,
  name,
  url,
  company,
  description,
  jobCompanyId,
}: PeopleSearchControlType) => {
  const { accessToken, searchControlData, crmUrl } = useStore();
  const {
    handleClickControlIcon,
    handleClickQuickFetch,
    setQuickShowCaptureDetail,
    setShowMainInfoDetail,
    showMainInfoDetail,
    showQuickCaptureDetail,
  } = useUserSearchControlButton(
    url || "",
    name || "",
    job || "",
    location || "",
    image || "",
    company || "",
    description || "",
    jobCompanyId || "",
  );

  return (
    <div className="controlIcon__holder">
      <div
        className="iconHolder contorlIcon"
        onMouseEnter={() => {
          setShowMainInfoDetail(true);
        }}
        onMouseLeave={() => {
          setShowMainInfoDetail(false);
        }}
      >
        <ControlIcon
          onClick={handleClickControlIcon}
          type={
            accessToken
              ? searchControlData.filter((data) => data.id === image)[0] &&
                searchControlData.filter((data) => data.id === image)[0].exist
                ? CONTROL_ICONS_TYPE.CAPTURE_EXIST
                : CONTROL_ICONS_TYPE.CAPTURE_NOEXIST
              : CONTROL_ICONS_TYPE.LOGIN
          }
        />
        {showMainInfoDetail && (
          <span className="iconHoverDetail">
            {accessToken
              ? searchControlData.filter((data) => data.id === image)[0] &&
                searchControlData.filter((data) => data.id === image)[0].exist
                ? "Contact already exists in CRM."
                : "Capture Contact into CRM."
              : "Login to LinkedIn extension"}
          </span>
        )}
      </div>
      {accessToken &&
        (searchControlData.filter((data) => data.id === image)[0] &&
        !searchControlData.filter((data) => data.id === image)[0].exist ? (
          <div
            onMouseEnter={() => {
              setQuickShowCaptureDetail(true);
            }}
            onMouseLeave={() => {
              setQuickShowCaptureDetail(false);
            }}
            className="iconHolder"
          >
            <QuickFetchIcon onClick={handleClickQuickFetch} />
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
                const existedData: BackendUserInterface | null | undefined =
                  searchControlData.filter((data) => data.id === image)[0]
                    .existedData;
                const contactId = existedData ? existedData.contactid : "";
                openInCrm(crmUrl, APP_LOCATION.USER, contactId);
              }}
            />
            {showQuickCaptureDetail && (
              <span className="iconHoverDetail">Redirect to Contact</span>
            )}
          </div>
        ))}
    </div>
  );
};

export default UserSearchControlButton;
