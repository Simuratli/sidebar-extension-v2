import React from "react";
import { executeScriptAndParseHTML } from "../utils/getHtml";
import { LINKEDIN_PAGE_ENUM, PAGE_ENUM } from "../types/global.types";
import { convertLinkedInEmployeesCount } from "../utils/convertEmployeeCount";
import { useStore } from "../store";

export const useCompanyScrape = () => {
  const {
    setCompanyProfileImage,
    setCompanyProfileUrl,
    setCompanyAdress,
    setCompanyName,
    setCompanyWebsiteUrl,
    setLinkedinCompanyId,
    setNumberOfEmployees,
    setCompanySize,
    setCompanyDescription,
    setLoading,
    setSalesNavigatorCompanyUrl,
    setPage,
  } = useStore();
  const scrapeCompanyData = async () => {
    await executeScriptAndParseHTML((html: Document | null, url: string) => {
      if (html) {
        let companyImage: string | null | undefined = null;
        let numOfEmployees: number | null | undefined = null;
        let companyAdress: string | null | undefined = null;
        let companyName: string | null | undefined = null;
        let idOfCompany: string | null | undefined = null;
        let companyWebsite: string | null | undefined = null;

        if (url.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY)) {
          setSalesNavigatorCompanyUrl(url);
          const headerForSales = html.querySelectorAll("header")[1];
          companyImage = headerForSales
            ?.querySelector("img")
            ?.getAttribute("src");
          numOfEmployees = convertLinkedInEmployeesCount(
            headerForSales
              ?.querySelector('[data-anonymize="company-size"]')
              ?.textContent?.trim(),
          );
          companyAdress = headerForSales
            ?.querySelector('[data-anonymize="location"]')
            ?.textContent?.trim();
          companyName = headerForSales
            ?.querySelector('[data-anonymize="company-name"]')
            ?.textContent?.trim();
          idOfCompany = url.split("company/")[1].split("?")[0];
          companyWebsite = html
            .querySelector(".view-website-link")
            ?.getAttribute("href");
        } else {
          setCompanyProfileUrl(url);
          const header = html.querySelector(".org-top-card");
          const actions = html.querySelector(".org-top-card-primary-actions");
          companyImage = header?.querySelector("img")?.getAttribute("src");
          numOfEmployees = convertLinkedInEmployeesCount(
            document
              .querySelector(".org-top-card-summary-info-list")
              ?.querySelector("a")
              ?.textContent?.trim(),
          );
          companyAdress = header
            ?.querySelector(".inline-block")
            ?.childNodes[1]?.textContent?.trim();
          companyName = header?.querySelector("h1")?.textContent?.trim();
          const idForSplitting = window.location.href.split("company/")[1];
          idOfCompany = idForSplitting?.split("/")[0];

          companyWebsite = actions
            ?.querySelector(".org-top-card-primary-actions__inner")
            ?.querySelector("a")?.href;

          if (!companyWebsite && window.location.href.includes("/about")) {
            companyWebsite = document
              .querySelector(".org-grid__content-height-enforcer")
              ?.querySelector("a")?.href;
          }
        }

        setCompanyProfileImage(companyImage);
        setCompanyAdress(companyAdress);
        setCompanyName(companyName);
        setCompanyWebsiteUrl(companyWebsite);
        setLinkedinCompanyId(idOfCompany);
        setNumberOfEmployees(numOfEmployees);
        setCompanyDescription(null);
        setCompanySize(0);
      } else {
        setLoading(false);
        setPage(PAGE_ENUM.ERROR);
      }
    });

    return;
  };

  return { scrapeCompanyData };
};
