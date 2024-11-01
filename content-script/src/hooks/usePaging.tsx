import React, { useState, useEffect } from "react";
import {
  CompanyPage,
  UserPage,
  ErrorPage,
  LoginPage,
  SetupPage,
  WrongPage,
  UserSearchPage,
  CompanySearchPage,
} from "../pages";
import {
  ACCESS_TOKEN_ENUM,
  ERROR_PAGE_TYPE,
  LINKEDIN_PAGE_ENUM,
  MESSAGE_ENUMS,
  PAGE_ENUM,
  STORAGED_ENUM,
} from "../types/global.types";
import { useStore } from "../store";
import { getAccessTokenRequest } from "../api";
import { getTimeDifferenceForToken } from "../utils/getTimeDifference";
import { useUserSearchButton } from "./useUserSearchButton";
import { areUrlsSame } from "../utils/url.utils";
import { useCompanyControlButton } from "./useCompanyControlButton";

export const usePaging = () => {
  const [updated, setUpdated] = useState(true);
  const {
    addControlForCompany,
    addControlForCompanySales,
    addForCompanySearch,
    addForSalesCompanySearch,
  } = useCompanyControlButton();
  const {
    setSidebarOpen,
    setPage,
    accessToken,
    authToken,
    page,
    setAuthToken,
    code_verifier,
    clientId,
    tenantId,
    crmUrl,
    setAccessToken,
    setRefreshToken,
    setTenantId,
    setCrmUrl,
    setClientId,
    setResetUser,
    setResetCompany,
  } = useStore();
  const {
    addForUserSearch,
    addControlForUser,
    addControlForUserSales,
    addForSalesUserSearch,
  } = useUserSearchButton();

  useEffect(() => {
    const messageListener = (message: any, sender: any, sendResponse: any) => {
      if (message.message === MESSAGE_ENUMS.LOGOUT) {
        logout();
        sendResponse({ status: "Logged out successfully" });
      }

      if (message.message === MESSAGE_ENUMS.REFRESS_TOKEN) {
        getAccessTokenFunction();
        sendResponse({ status: "Logged out successfully" });
      }

      if (message.url) {
        const isItSame = areUrlsSame(
          localStorage.getItem("currentPage") || "",
          window.location.href,
        );
        localStorage.setItem("currentPage", message.url);
        if (message.url.includes(LINKEDIN_PAGE_ENUM.USER)) {
          if (isItSame) {
            setUpdated(false);
            setSidebarOpen(false);
            setTimeout(() => {
              setUpdated(true);
            }, 200);
            setPageViaUrl();
          }
        } else {
          setUpdated(false);
          setSidebarOpen(false);
          setTimeout(() => {
            setUpdated(true);
          }, 200);
          setPageViaUrl();
        }
      }
      if (message.message === MESSAGE_ENUMS.ACCESS_TOKEN_GOES_BACK) {
        if (message.code) {
          setAuthToken(message.code);
          localStorage.setItem(STORAGED_ENUM.AUTH_TOKEN, message.code);
        }
      }
      console.log("Received message from " + sender + ": ", message);
      sendResponse({ received: true }); //respond however you like
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const logout = () => {
    setResetCompany();
    setResetUser();
    setPage(PAGE_ENUM.SETUP);
    localStorage.removeItem(STORAGED_ENUM.REFRESH_TIME);
    localStorage.removeItem(STORAGED_ENUM.REFRESH_TOKEN);
    localStorage.removeItem(STORAGED_ENUM.ACCESS_TOKEN);
    localStorage.removeItem(STORAGED_ENUM.AUTH_TOKEN);
    setPage(PAGE_ENUM.SETUP);
    setPageViaUrl();
  };

  useEffect(() => {
    putIconsToScreen();
    const storagedRefreshTime = localStorage.getItem(
      STORAGED_ENUM.REFRESH_TIME,
    );
    const storagedRefreshToken = localStorage.getItem(
      STORAGED_ENUM.REFRESH_TOKEN,
    );
    const storagedAccessToken = localStorage.getItem(
      STORAGED_ENUM.ACCESS_TOKEN,
    );
    const storagedAuthToken = localStorage.getItem(STORAGED_ENUM.AUTH_TOKEN);

    if (
      storagedRefreshTime &&
      storagedAccessToken &&
      storagedRefreshToken &&
      storagedAuthToken
    ) {
      setAccessToken(storagedAccessToken);
      setRefreshToken(storagedRefreshToken);
      setAuthToken(storagedAuthToken);
      const timeDifference = getTimeDifferenceForToken(
        new Date(storagedRefreshTime),
      );

      if (timeDifference >= 8) {
        logout();
      }
    }

    setPageViaUrl();
  }, []);

  const putIconsToScreen = () => {
    addForUserSearch();
    addControlForUser();
    addControlForUserSales();
    addForSalesUserSearch();
    addForSalesCompanySearch();
    addControlForCompany();
    addForCompanySearch();
    addControlForCompanySales();
    setTimeout(() => {
      addForUserSearch();
      addControlForUser();
      addForCompanySearch();
      addControlForCompany();
      addControlForUserSales();
      addForSalesUserSearch();
      addForSalesCompanySearch();
      addControlForCompanySales();
    }, 3000);
  };

  useEffect(() => {
    if (
      window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH) ||
      window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY_SEARCH)
    ) {
      let container = document.querySelector("#search-results-container");

      const handleScroll = () => {
        if (
          window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH)
        ) {
          addForSalesUserSearch();
        }
        if (
          window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY_SEARCH)
        ) {
          addForSalesCompanySearch();
        }
      };

      const interval = setInterval(() => {
        container = document.querySelector("#search-results-container");

        if (container) {
          container.addEventListener("scroll", handleScroll);
          clearInterval(interval);
        }
      }, 2000);

      return () => {
        container
          ? container.removeEventListener("scroll", handleScroll)
          : container;
      };
    }
  }, [updated]);

  useEffect(() => {
    if (!updated) {
      setPageViaUrl();
      putIconsToScreen();
      setResetCompany();
      setResetUser();
    }
  }, [updated, accessToken, authToken]);

  const getAccessTokenFunction = async () => {
    const storagedRefreshToken = localStorage.getItem(
      STORAGED_ENUM.REFRESH_TOKEN,
    );

    if (storagedRefreshToken) {
      getAccessTokenRequest(
        clientId,
        tenantId,
        crmUrl,
        code_verifier,
        ACCESS_TOKEN_ENUM.REFRESH,
        storagedRefreshToken,
      ).then((response) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          setRefreshToken(response.refresh_token);
          localStorage.setItem(
            STORAGED_ENUM.ACCESS_TOKEN,
            response.access_token,
          );
          localStorage.setItem(
            STORAGED_ENUM.REFRESH_TOKEN,
            response.refresh_token,
          );
          localStorage.setItem(STORAGED_ENUM.REFRESH_TIME, `${new Date()}`);
        }
      });
    }
  };

  useEffect(() => {
    const storagedRefreshToken = localStorage.getItem(
      STORAGED_ENUM.REFRESH_TOKEN,
    );
    const storagedRefreshTime = localStorage.getItem(
      STORAGED_ENUM.REFRESH_TIME,
    );

    if (storagedRefreshTime && storagedRefreshToken) {
      const timeDifference = getTimeDifferenceForToken(
        new Date(storagedRefreshTime),
      );
      if (timeDifference > 1) {
        getAccessTokenFunction();
      }
    }

    setPageViaUrl();
  }, [updated, authToken, clientId, crmUrl, code_verifier, tenantId]);

  useEffect(() => {
    const storagedTenantId = localStorage.getItem(STORAGED_ENUM.TENANT_ID);
    const storagedClientId = localStorage.getItem(STORAGED_ENUM.CLIENT_ID);
    const storagedCRMUrl = localStorage.getItem(STORAGED_ENUM.CRM_URL);
    if (storagedClientId && storagedCRMUrl && storagedTenantId) {
      setClientId(storagedClientId);
      setTenantId(storagedTenantId);
      setCrmUrl(storagedCRMUrl);
    }
  }, []);

  useEffect(() => {
    if (!accessToken && authToken) {
      getAccessTokenRequest(
        clientId,
        tenantId,
        crmUrl,
        code_verifier,
        ACCESS_TOKEN_ENUM.BASIC,
        authToken,
      ).then((response) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          setRefreshToken(response.refresh_token);
          localStorage.setItem(
            STORAGED_ENUM.ACCESS_TOKEN,
            response.access_token,
          );
          localStorage.setItem(
            STORAGED_ENUM.REFRESH_TOKEN,
            response.refresh_token,
          );
          localStorage.setItem(STORAGED_ENUM.REFRESH_TIME, `${new Date()}`);
          setPageViaUrl();
        }
      });
    } else {
      setPageViaUrl();
    }
  }, [authToken, accessToken]);

  const setPageViaUrl = () => {
    const url = window.location.href;
    if (!url.includes(LINKEDIN_PAGE_ENUM.LINKEDIN)) {
      setPage(PAGE_ENUM.WRONG_PAGE);
    } else {
      if (authToken && accessToken) {
        switch (true) {
          case url.includes(LINKEDIN_PAGE_ENUM.COMPANY) ||
            url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY):
            setPage(PAGE_ENUM.COMPANY);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY_SEARCH) ||
            url.includes(LINKEDIN_PAGE_ENUM.COMPANY_SEARCH):
            setPage(PAGE_ENUM.SEARCH_COMPANY_SCRAPE);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH) ||
            url.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH):
            setResetUser();
            setPage(PAGE_ENUM.SEARCH_PEOPLE_SCRAPE);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.USER) ||
            url.includes(LINKEDIN_PAGE_ENUM.SALES_USER):
            setPage(PAGE_ENUM.USER);
            break;
          case url.includes(LINKEDIN_PAGE_ENUM.USER):
            setPage(PAGE_ENUM.USER);
            break;
          default:
            setPage(PAGE_ENUM.WRONG_PAGE);
            break;
        }
      } else {
        if (page !== PAGE_ENUM.LOGIN && page !== PAGE_ENUM.SETUP) {
          setPage(PAGE_ENUM.SETUP);
        }
      }
    }
  };

  const CurrentPage = () => {
    switch (page) {
      case PAGE_ENUM.SETUP:
        return <SetupPage />;
      case PAGE_ENUM.LOGIN:
        return <LoginPage />;
      case PAGE_ENUM.SOMETHING_WENT_WRONG:
        return <ErrorPage page={ERROR_PAGE_TYPE.LOGIN} />;
      case PAGE_ENUM.ERROR:
        return <ErrorPage page={ERROR_PAGE_TYPE.ACTION} />;
      case PAGE_ENUM.USER:
        return <UserPage />;
      case PAGE_ENUM.COMPANY:
        return <CompanyPage />;
      case PAGE_ENUM.WRONG_PAGE:
        return <WrongPage />;
      case PAGE_ENUM.SEARCH_COMPANY_SCRAPE:
        return <CompanySearchPage />;
      case PAGE_ENUM.SEARCH_PEOPLE_SCRAPE:
        return <UserSearchPage />;
      default:
        return <></>;
    }
  };

  return { CurrentPage, updated };
};
