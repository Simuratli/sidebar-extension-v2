import React from "react";
import { LINKEDIN_PAGE_ENUM, PAGE_ENUM } from "../types/global.types";
import { executeScriptAndParseHTML } from "../utils/getHtml";
import { dateToNormalDateString } from "../utils/time.utils";
import { useStore } from "../store";
import { extractNameAndSurname } from "../utils/removeEmojis";
import { ProfileData } from "../../../background/background";

const useUserScrape = () => {
  const {
    setFullname,
    setPage,
    setLoading,
    setUserAdress,
    setUserLinkedin,
    setUserSales,
    setJobTitle,
    setWorkPhone,
    setCustomer,
    setCustomerId,
    setPersonalEmail,
    setPersonalPhone,
    setErrorText,
    setBirthday,
    setUserProfileImage,
    // customerId,
    setCompanyName,
    setLinkedinCompanyId,
    setEmail,
  } = useStore();

  const scrapeUserData = async () => {
    await executeScriptAndParseHTML((html: Document | null, url: string) => {
      if (html) {
        let userCostumerId: string | null | undefined = null;
        let userCostumer: string | null | undefined = null;
        let userBirthday: string | null | undefined = null;
        let userFullName: string | null | undefined = null;
        let userAdress: string | null | undefined = null;
        let userJobTitle: string | null | undefined = null;
        let userPersonalPhone: string | null | undefined = null;
        let userWorkPhone: string | null | undefined = null;
        let userPersonalEmail: string | null | undefined = null;
        let userProfileImage: string | null | undefined = null;

        if (url.includes(LINKEDIN_PAGE_ENUM.USER)) {
          const headPanel = html.querySelector(".pb5")
            ? document.querySelector(".pb5")
            : document.querySelector(".ph5");
          const artdecoCards = document.querySelectorAll(".artdeco-card");
          userProfileImage = headPanel
            ?.querySelector("img")
            ?.getAttribute("src");
          setUserLinkedin(url);
        } else {
          const headPanel = html.querySelector("._header_sqh8tm");
          setUserSales(url);

          userCostumerId = html
            ?.querySelector('[data-sn-view-name="lead-current-role"]')
            ?.querySelector("a")
            ?.href.split("/sales/company/")[1];
          userCostumer = html
            ?.querySelector('[data-sn-view-name="lead-current-role"]')
            ?.querySelector('[data-anonymize="company-name"]')
            ?.textContent?.trim();
          userBirthday = null;
          userFullName = headPanel?.querySelector("h1")?.textContent?.trim();
          userAdress = headPanel
            ?.querySelector(".HblPRqGaLuHGtcuWzKdSRYYJoJQWyVdffTxA")
            ?.textContent?.trim()
            .split("  ")[0];
          userJobTitle = headPanel
            ?.querySelector('[data-anonymize="headline"]')
            ?.textContent?.trim();
          userPersonalPhone = html
            .querySelector('[data-sn-view-name="lead-contact-info"]')
            ?.querySelector('[data-anonymize="phone"]')
            ?.textContent?.trim();
          userWorkPhone = null;
          userPersonalEmail = html
            .querySelector('[data-sn-view-name="lead-contact-info"]')
            ?.querySelector('[data-anonymize="email"]')
            ?.textContent?.trim();
          userProfileImage = headPanel
            ?.querySelector("img")
            ?.getAttribute("src");

          setBirthday(userBirthday);
          setPersonalEmail(userPersonalEmail);
          if (userPersonalPhone) {
            setPersonalPhone(userPersonalPhone);
          }
          setEmail(null);
          setCustomerId(userCostumerId);
          setCustomer(userCostumer);
          setFullname(extractNameAndSurname(userFullName || ""));
          setUserAdress(userAdress);
          setWorkPhone(userWorkPhone);
          setJobTitle(extractNameAndSurname(userJobTitle || ""));
          setCompanyName(userCostumer || "");
          setLinkedinCompanyId(userCostumerId);
        }
        setUserProfileImage(userProfileImage);
      } else {
        setLoading(false);
        setPage(PAGE_ENUM.ERROR);
      }
    });

    return;
  };

  const saveUserDetailsInLinkedinUser = (
    profileBackground: ProfileData | null,
  ) => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER)) {
      if (profileBackground) {
        setUserAdress(profileBackground.adress);
        setJobTitle(profileBackground.headline);
        setCustomer(profileBackground.company);
        setUserAdress(profileBackground.adress);
        setCompanyName(profileBackground.company);
        setCustomerId(profileBackground.companyId);
        setBirthday(dateToNormalDateString(profileBackground.birthDate));
        setPersonalEmail(profileBackground.email);
        setPersonalPhone(profileBackground.MOBILE);
        setFullname(
          extractNameAndSurname(
            `${profileBackground.firstName} ${profileBackground.lastName}`,
          ),
        );
      } else {
        const profileId = window.location.pathname.match(/\/in\/([^/]+)/)?.[1];
        if (profileId) {
          chrome.runtime.sendMessage({
            type: "FETCH_PROFILE",
            profileId: profileId,
          });
        }
      }
    }
  };

  return { scrapeUserData, saveUserDetailsInLinkedinUser };
};

export default useUserScrape;
