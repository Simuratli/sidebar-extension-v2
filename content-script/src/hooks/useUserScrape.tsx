import React from "react";
import { LINKEDIN_PAGE_ENUM, PAGE_ENUM } from "../types/global.types";
import { executeScriptAndParseHTML } from "../utils/getHtml";
import { dateToNormalDateString } from "../utils/time.utils";
import { useStore } from "../store";
import { removeEmojis } from "../utils/removeEmoji";

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
    webApiEndpoint,
    accessToken,
    uds_linkedin,
    uds_salesnavigatoruserurl,
    fullname,
    userPagination,
    setUserPagination,
    setUserBackendData,
    setUserBackendDataWithNames,
    setCompanyBackendData,
    setCompanyName,
    setLinkedinCompanyId,
    userBackendData,
    customerId,
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
          userFullName = headPanel
            ?.querySelector("h1")
            ?.textContent?.trim()
            .slice(0, 100);

          userAdress = headPanel
            ?.querySelector(".mt2")
            ?.querySelector(
              "span.text-body-small.inline.t-black--light.break-words",
            )
            ?.textContent?.trim()
            .replace(/\s+/g, " ");
          userJobTitle = headPanel
            ?.querySelector(".text-body-medium")
            ?.textContent?.trim()
            .replace(/\s+/g, " ")
            .slice(0, 1000);

          // const assignedUserCustomer = headPanel
          //   ?.querySelector("ul")
          //   ?.querySelector("button")
          //   ?.querySelector("span")
          //   ?.textContent?.trim();

          const assignedUserCustomer = null;

          if (!assignedUserCustomer) {
            artdecoCards.forEach((artdecoCard) => {
              if (
                artdecoCard
                  .querySelector(".pvs-header__title")
                  ?.innerHTML.includes("Experience") ||
                artdecoCard
                  .querySelector(".pvs-header__title")
                  ?.innerHTML.includes("Deneyim")
              ) {
                const customerIdWithSlash = artdecoCard
                  ?.querySelector("ul")
                  ?.querySelector('[data-field="experience_company_logo"]')
                  ?.getAttribute("href")
                  ?.split("https://www.linkedin.com/company/")[1];

                if (customerIdWithSlash) {
                  userCostumerId = customerIdWithSlash?.split("/")[0];
                  userCostumer = artdecoCard
                    .querySelector("li")
                    ?.querySelector(`.t-normal`)
                    ?.querySelector(`[aria-hidden="true"]`)
                    ?.textContent?.split("·")[0];
                  // userCostumer = assignedUserCustomer
                  //   ? assignedUserCustomer
                  //   : artdecoCard
                  //       .querySelector(".hoverable-link-text")
                  //       ?.querySelector('[aria-hidden="true"]')
                  //       ?.textContent?.split("·")[0];
                }
              }
            });
          } else {
            userCostumer = assignedUserCustomer;
          }

          const infoModal = html.querySelector("[role='dialog']");
          const contactElements = infoModal?.querySelectorAll(
            ".pv-contact-info__contact-type",
          );

          contactElements?.forEach((element) => {
            if (
              element?.querySelector("h3")?.innerHTML.includes("Phone") ||
              element?.querySelector("h3")?.innerHTML.includes("Telefon")
            ) {
              if (
                element
                  ?.querySelector("li")
                  ?.querySelector(".t-black--light")
                  ?.innerHTML.trim()
                  ?.includes("Mobile") ||
                element
                  ?.querySelector("li")
                  ?.querySelector(".t-black--light")
                  ?.innerHTML.trim()
                  ?.includes("Mobil")
              ) {
                userPersonalPhone = element
                  ?.querySelector("li")
                  ?.querySelector(".t-black")
                  ?.innerHTML.trim();
              } else {
                userWorkPhone = element
                  ?.querySelector("li")
                  ?.querySelector(".t-black")
                  ?.innerHTML.trim();
              }
            } else if (
              element?.querySelector("h3")?.innerHTML.includes("Birthday")
            ) {
              userBirthday = dateToNormalDateString(
                element?.querySelector("span")?.innerHTML.trim(),
              );
            }
          });
          userPersonalEmail = infoModal
            ?.querySelector('a[href*="mailto"]')
            ?.textContent?.trim()
            .replace(/\s+/g, " ");

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
            ?.querySelector(".EBmuDvcrKIsrIgEqZcRfFWErAPcMMNRSLo")
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
        }

        setFullname(removeEmojis(userFullName || ""));
        setUserAdress(userAdress);
        setWorkPhone(userWorkPhone);
        setPersonalEmail(userPersonalEmail);
        if (userPersonalPhone) {
          setPersonalPhone(userPersonalPhone);
        }

        setJobTitle(removeEmojis(userJobTitle || ""));
        setBirthday(userBirthday);
        setCustomerId(userCostumerId);
        setCustomer(userCostumer);
        setUserProfileImage(userProfileImage);
        setEmail(null);
        //display it directly inside dropdown
        setCompanyName(userCostumer || "");
        setLinkedinCompanyId(userCostumerId);
      } else {
        setLoading(false);
        setPage(PAGE_ENUM.ERROR);
      }
    });

    return;
  };

  return { scrapeUserData };
};

export default useUserScrape;
