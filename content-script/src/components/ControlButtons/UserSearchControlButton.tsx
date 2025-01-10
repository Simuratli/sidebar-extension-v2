import React from "react";
import { PeopleSearchControlType } from "./ControlButton.types";
import { ControlIcon, QuickFetchIcon, RedirectIcon } from "../../assets";
import { APP_LOCATION, CONTROL_ICONS_TYPE } from "../../types/global.types";
import { useStore } from "../../store";
import { BackendUserInterface } from "../../api/api.types";
import { openInCrm } from "../../utils/openCrm.util";
import "../../style/component/control.scss";
import { useUserSearchControlButton } from "../../hooks/useUserSearchControlButton";
import { SearchControlStateObject } from "../../store/searchControl";

const UserSearchControlButton = ({ image, url }: PeopleSearchControlType) => {
  const { accessToken, searchControlData, crmUrl } = useStore();

  const {
    handleClickControlIcon,
    handleClickQuickFetch,
    setQuickShowCaptureDetail,
    setShowMainInfoDetail,
    showMainInfoDetail,
    showQuickCaptureDetail,
  } = useUserSearchControlButton(url || "", image || "");

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
              ? searchControlData.filter(
                  (data: SearchControlStateObject) =>
                    encodeURIComponent(data.publicIdentifier!) ===
                    url?.split("/in/")[1]?.split("?")[0],
                )[0] &&
                searchControlData.filter(
                  (data) =>
                    encodeURIComponent(data.publicIdentifier!) ===
                    url?.split("/in/")[1]?.split("?")[0],
                )[0].exist
                ? CONTROL_ICONS_TYPE.CAPTURE_EXIST
                : CONTROL_ICONS_TYPE.CAPTURE_NOEXIST
              : CONTROL_ICONS_TYPE.LOGIN
          }
        />
        {showMainInfoDetail && (
          <span className="iconHoverDetail">
            {accessToken
              ? searchControlData.filter(
                  (data) =>
                    encodeURIComponent(data.publicIdentifier!) ===
                    url?.split("/in/")[1]?.split("?")[0],
                )[0] &&
                searchControlData.filter(
                  (data) =>
                    encodeURIComponent(data.publicIdentifier!) ===
                    url?.split("/in/")[1]?.split("?")[0],
                )[0].exist
                ? "Contact already exists in CRM."
                : "Capture Contact into CRM."
              : "Login to LinkedIn extension"}
          </span>
        )}
      </div>
      {accessToken &&
        (searchControlData.filter(
          (data) =>
            encodeURIComponent(data.publicIdentifier!) ===
            url?.split("/in/")[1]?.split("?")[0],
        )[0] &&
        !searchControlData.filter(
          (data) =>
            encodeURIComponent(data.publicIdentifier!) ===
            url?.split("/in/")[1]?.split("?")[0],
        )[0].exist ? (
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
                  searchControlData.filter(
                    (data) =>
                      encodeURIComponent(data.publicIdentifier!) ===
                      url?.split("/in/")[1]?.split("?")[0],
                  )[0].existedData;
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
