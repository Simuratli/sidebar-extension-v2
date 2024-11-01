import React, { useEffect } from "react";
import { CONTROL_ICONS_TYPE, LINKEDIN_PAGE_ENUM } from "../types/global.types";
import { useStore } from "../store";

export const useControlButton = () => {
  const {
    accessToken,
    userBackendData,
    companyBackData,
    setSidebarOpen,
    sidebarOpen,
  } = useStore();

  const handleClickControl = () => {
    setSidebarOpen(true);
  };

  const generateTypeOfControl = () => {
    if (accessToken) {
      if (
        window.location.href.includes(LINKEDIN_PAGE_ENUM.USER) ||
        window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER)
      ) {
        if (userBackendData) {
          return CONTROL_ICONS_TYPE.CAPTURE_EXIST;
        } else {
          return CONTROL_ICONS_TYPE.CAPTURE_NOEXIST;
        }
      } else if (
        window.location.href.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH)
      ) {
        return CONTROL_ICONS_TYPE.CAPTURE_NOEXIST;
      } else if (
        window.location.href.includes(LINKEDIN_PAGE_ENUM.COMPANY) ||
        window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY)
      ) {
        if (companyBackData) {
          return CONTROL_ICONS_TYPE.CAPTURE_EXIST;
        } else {
          return CONTROL_ICONS_TYPE.CAPTURE_NOEXIST;
        }
      } else {
        return CONTROL_ICONS_TYPE.LOGIN;
      }
    } else {
      return CONTROL_ICONS_TYPE.LOGIN;
    }
  };
  return {
    generateTypeOfControl,
    handleClickControl,
  };
};
