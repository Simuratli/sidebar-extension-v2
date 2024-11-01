import React from "react";
import { Avatar, Button } from "..";
import {
  BUTTON_ENUM,
  LINKEDIN_PAGE_ENUM,
  STORAGED_ENUM,
} from "../../types/global.types";
import { LogoutIcon, InfoIcon } from "../../assets";
import "../../style/component/profile.scss";
import { ProfilePropTypes } from "./Profile.types";
import { useStore } from "../../store";
import { PAGE_ENUM } from "../../types/global.types";
function Profile({ image, name, onClick }: ProfilePropTypes) {
  const {
    setPage,
    companyBackData,
    userBackendData,
    setSearchControlData,
    setAccessToken,
    setAuthToken,
    setRefreshToken,
  } = useStore();
  return (
    <div className={`profile ${"mt-30"}`}>
      <div className="profile__data">
        <Avatar onClick={onClick} image={image} />
        <div className="profile__information">
          <h1 className="profile__information__name">{name}</h1>
          <h2 className="profile__information__info">
            {companyBackData || userBackendData
              ? "Contact already exists in the CRM"
              : "Contact doesn’t exist in CRM"}
            <InfoIcon />
          </h2>
        </div>
      </div>
      <Button
        onClick={() => {
          // chrome.storage.sync.clear();
          // chrome.storage.sync.remove([STORAGED_ENUM.AUTH_TOKEN,STORAGED_ENUM.ACCESS_TOKEN,STORAGED_ENUM.REFRESH_TIME,STORAGED_ENUM.REFRESH_TOKEN])
          localStorage.removeItem(STORAGED_ENUM.AUTH_TOKEN);
          localStorage.removeItem(STORAGED_ENUM.ACCESS_TOKEN);
          localStorage.removeItem(STORAGED_ENUM.REFRESH_TIME);
          localStorage.removeItem(STORAGED_ENUM.REFRESH_TOKEN);
          setAccessToken("");
          setAuthToken("");
          setRefreshToken("");
          setSearchControlData([]);
          setPage(PAGE_ENUM.SETUP);
        }}
        icon={<LogoutIcon />}
        type={BUTTON_ENUM.LOGOUT}
      />
    </div>
  );
}

export default Profile;
