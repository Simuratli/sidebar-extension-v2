import { useState, useEffect } from "react";
import { LINKEDIN_PAGE_ENUM } from "../types/global.types";
export function useWrongTab() {
  const [inLinkedinButWrong, setInLinkedinButWrong] = useState(false);

  useEffect(() => {
    const currentTab = window.location.href;
    if (currentTab) {
      if (currentTab.includes(LINKEDIN_PAGE_ENUM.LINKEDIN)) {
        setInLinkedinButWrong(
          !currentTab.includes(LINKEDIN_PAGE_ENUM.COMPANY) ||
            !currentTab.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY) ||
            !currentTab.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH) ||
            !currentTab.includes(LINKEDIN_PAGE_ENUM.SALES_USER) ||
            !currentTab.includes(LINKEDIN_PAGE_ENUM.USER),
        );
      }
    }

    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const currentTab = tabs[0];
    //   if (currentTab && currentTab.url) {
    //     if (currentTab.url.includes(LINKEDIN_PAGE_ENUM.LINKEDIN)) {
    //       setInLinkedinButWrong(
    //         !currentTab.url.includes(LINKEDIN_PAGE_ENUM.COMPANY) ||
    //           !currentTab.url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY) ||
    //           !currentTab.url.includes(LINKEDIN_PAGE_ENUM.SALES_USER) ||
    //           !currentTab.url.includes(LINKEDIN_PAGE_ENUM.USER),
    //       );
    //     }
    //   }
    // });
  }, []);

  return { inLinkedinButWrong };
}
