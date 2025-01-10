import ReactDOM from "react-dom";
import React from "react";
import {
  CompanyControlButton,
  CompanySearchControlButton,
} from "../components/ControlButtons";
import { convertLinkedInEmployeesCount } from "../utils/convertEmployeeCount";
import { LINKEDIN_PAGE_ENUM } from "../types/global.types";
export const useCompanyControlButton = () => {
  const addControlForCompany = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.COMPANY)) {
      let header = document.querySelector(".ph5");
      if (!header) {
        header = document.querySelector(".pb5");
      }
      const LinkProfile = header?.querySelector(
        ".org-top-card-summary__title",
      ) as HTMLElement;
      const idForLinkedinIconElelement = document.querySelector(
        "#idForLinkedinIconCompany",
      );
      LinkProfile?.classList?.add("inline");
      if (!idForLinkedinIconElelement) {
        const div = document.createElement("div");
        div.id = "idForLinkedinIconCompany";
        if (LinkProfile) {
          // LinkProfile.append(div);
          LinkProfile.insertAdjacentElement("afterend", div);
        }
      } else {
        ReactDOM.render(<CompanyControlButton />, idForLinkedinIconElelement);
      }
    }
  };

  const addControlForCompanySales = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY)) {
      let header = document.querySelector(".account-top-card");
      if (!header) {
        header = document.querySelector(".artdeco-entity-lockup");
      }
      if (header) {
        const LinkProfile = header?.querySelector(
          ".artdeco-entity-lockup__title",
        ) as HTMLElement;
        const idForLinkedinIconElelement = document.querySelector(
          "#idForLinkedinIconCompany",
        );
        LinkProfile?.classList?.add("inline");
        if (!idForLinkedinIconElelement) {
          const div = document.createElement("div");
          div.id = "idForLinkedinIconCompany";
          if (LinkProfile) {
            // LinkProfile.append(div);
            LinkProfile.insertAdjacentElement("afterend", div);
          }
        } else {
          ReactDOM.render(<CompanyControlButton />, idForLinkedinIconElelement);
        }
      }
    }
  };

  const addForCompanySearch = async () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.COMPANY_SEARCH)) {
      const usernames = document.querySelectorAll(
        `[data-view-name="search-entity-result-universal-template"]`,
      );
      usernames.forEach((user) => {
        const mainParentCard = user;
        // user?.classList?.add("noOverflow");
        const image = mainParentCard?.querySelector("img")?.src;
        const companyName = mainParentCard
          ?.querySelectorAll("a")[1]
          ?.textContent?.trim();
        const location = mainParentCard
          ?.querySelector(".mb1")
          ?.querySelector(".t-black")
          ?.textContent?.trim()
          .split("•")[1];
        const description = mainParentCard
          ?.querySelector(".entity-result__summary--2-lines")
          ?.textContent?.trim();

        const userElement = user as HTMLElement;
        // userElement.style.position = 'relative';
        // userElement.style.overflow = 'auto';
        userElement.style.width = "100%";
        const LinkProfile = user?.querySelectorAll("a")[1].parentElement
          ?.parentElement as HTMLElement;
        LinkProfile.style.position = "relative";
        LinkProfile.style.overflow = "unset";
        LinkProfile.style.width = "100%";
        LinkProfile.style.display = "flex";
        LinkProfile.style.alignItems = "center";
        const idForLinkedinIconElelement =
          user.querySelector(".idForLinkedinIcon");
        if (!idForLinkedinIconElelement) {
          const div = document.createElement("div");
          div?.classList?.add("idForLinkedinIcon");
          if (LinkProfile) {
            LinkProfile.appendChild(div);
          }
        } else {
          const url = LinkProfile?.querySelector("a")?.href.split("?")[0];
          const parts = url?.split("/");
          const id: string = parts ? parts[parts.length - 2] : ""; // get the second to last part

          ReactDOM.render(
            <CompanySearchControlButton
              name={companyName}
              description={description}
              image={image || id}
              id={id}
              location={location}
              url={url}
            />,
            idForLinkedinIconElelement,
          );
        }
      });
    }
  };

  const addForSalesCompanySearch = () => {
    if (
      window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_COMPANY_SEARCH)
    ) {
      let companyNames = document.querySelectorAll(
        ".artdeco-entity-lockup__title",
      );

      const interval = setInterval(() => {
        companyNames = document.querySelectorAll(
          ".artdeco-entity-lockup__title",
        );

        if (companyNames.length !== 0) {
          clearInterval(interval);
          companyNames.forEach((company) => {
            const mainComponent =
              company.parentElement?.parentElement?.parentElement?.parentElement
                ?.parentElement;
            const userElement = company as HTMLElement;
            // userElement.style.width = "100%";
            userElement.style.position = "relative";
            const LinkProfile = company?.querySelector("a");
            const companyName = LinkProfile?.textContent?.trim();
            const numberOfEmployees = mainComponent
              ?.querySelector(".artdeco-entity-lockup__subtitle")
              ?.querySelector("a")
              ?.textContent?.trim();
            const mainCountOFemployees = convertLinkedInEmployeesCount(
              numberOfEmployees?.split(" ")[0],
            );

            const description = mainComponent
              ?.querySelector(".pl1")
              ?.querySelector(".t-black--light")
              ?.textContent?.trim();
            const image = mainComponent?.querySelector("img")?.src;
            const getIdSecondPart = LinkProfile?.href.split(
              LINKEDIN_PAGE_ENUM.SALES_COMPANY,
            )[1];
            const idOfCompany = getIdSecondPart?.split("?")[0];
            const idForLinkedinIconElelement =
              company.querySelector(".idForLinkedinIcon");
            if (!idForLinkedinIconElelement) {
              const div = document.createElement("div");
              div?.classList?.add("idForLinkedinIcon");
              if (company) {
                company.appendChild(div);
              }
            } else {
              ReactDOM.render(
                <CompanySearchControlButton
                  name={companyName}
                  description={description}
                  image={image}
                  id={idOfCompany}
                  numberOfEmployees={mainCountOFemployees}
                  url={LinkProfile?.href}
                />,
                idForLinkedinIconElelement,
              );
            }
          });
        }
      }, 1500);
    }
  };

  return {
    addControlForCompany,
    addControlForCompanySales,
    addForCompanySearch,
    addForSalesCompanySearch,
  };
};
