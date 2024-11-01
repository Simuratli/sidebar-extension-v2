import React from "react";
import ReactDOM from "react-dom";
import { UserSearchControlButton, UserControlButton } from "../components";
import { LINKEDIN_PAGE_ENUM } from "../types/global.types";

export const useUserSearchButton = () => {
  const addForUserSearch = async () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH)) {
      const usernames = document.querySelectorAll(".entity-result__title-line");
      usernames.forEach((user) => {
        const mainParentCard = user.parentElement?.parentElement?.parentElement;
        user?.classList?.add("noOverflow");
        const image =
          mainParentCard?.parentElement?.parentElement?.querySelector(
            "img",
          )?.src;
        const userName = mainParentCard
          ?.querySelector("a")
          ?.querySelector('[aria-hidden="true"]')
          ?.textContent?.trim();
        const job = mainParentCard
          ?.querySelector(".entity-result__primary-subtitle")
          ?.textContent?.trim();
        const location = mainParentCard
          ?.querySelector(".entity-result__secondary-subtitle")
          ?.textContent?.trim();

        const userElement = user as HTMLElement;
        // userElement.style.position = 'relative';
        // userElement.style.overflow = 'auto';
        userElement.style.width = "100%";
        const LinkProfile = user?.querySelector(".entity-result__title-text");
        const idForLinkedinIconElelement =
          user.querySelector(".idForLinkedinIcon");
        if (!idForLinkedinIconElelement) {
          const div = document.createElement("div");
          div?.classList?.add("idForLinkedinIcon");
          if (LinkProfile) {
            LinkProfile.appendChild(div);
          }
        } else {
          ReactDOM.render(
            <UserSearchControlButton
              name={userName}
              job={job}
              image={
                image || LinkProfile?.querySelector("a")?.href.split("?")[0]
              }
              location={location}
              url={LinkProfile?.querySelector("a")?.href.split("?")[0]}
            />,
            idForLinkedinIconElelement,
          );
        }
      });
    }
  };

  const addControlForUser = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER)) {
      let header = document.querySelector(".ph5");
      if (!header) {
        header = document.querySelector(".pb5");
      }
      let LinkProfile = header
        ?.querySelector(".artdeco-hoverable-trigger")
        ?.querySelector("a");

      if (!LinkProfile) {
        LinkProfile = header
          ?.querySelectorAll(
            ".artdeco-hoverable-trigger--content-placed-bottom",
          )[1]
          .querySelector("a");
      }
      const idForLinkedinIconElelement =
        document.querySelector("#idForLinkedinIcon");

      if (!idForLinkedinIconElelement) {
        const div = document.createElement("div");
        div.id = "idForLinkedinIcon";
        if (LinkProfile) {
          // LinkProfile.append(div);
          LinkProfile.insertAdjacentElement("afterend", div);
        }
      } else {
        ReactDOM.render(<UserControlButton />, idForLinkedinIconElelement);
      }
    }
  };

  const addControlForUserSales = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER)) {
      let header = document.querySelector("[data-x--lead--name]");
      if (!header) {
        header = document.querySelector(".artdeco-entity-lockup");
      }
      if (header) {
        const LinkProfile = header;
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
          ReactDOM.render(<UserControlButton />, idForLinkedinIconElelement);
        }
      }
    }
  };

  const addForSalesUserSearch = () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH)) {
      let companyNames = document.querySelectorAll(
        ".artdeco-entity-lockup__title",
      );
      if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES_USER_SEARCH)) {
        const interval = setInterval(() => {
          companyNames = document.querySelectorAll(
            ".artdeco-entity-lockup__title",
          );
          if (companyNames.length !== 0) {
            clearInterval(interval);

            companyNames.forEach((company) => {
              const mainComponent =
                company.parentElement?.parentElement?.parentElement
                  ?.parentElement?.parentElement;
              const userElement = company as HTMLElement;
              userElement.style.width = "100%";
              userElement.style.position = "relative";
              const LinkProfile = company?.querySelector("a");
              const userName = LinkProfile?.textContent?.trim();
              const description = mainComponent
                ?.querySelector(".pl1")
                ?.querySelector(".t-black--light")
                ?.textContent?.trim();
              const image = mainComponent?.querySelector("img")?.src;
              const companyName = mainComponent
                ?.querySelector(".artdeco-entity-lockup__subtitle")
                ?.querySelector("a")
                ?.textContent?.trim();
              let jobCompanyID;
              if (company) {
                const jobCompanyUrl = mainComponent
                  ?.querySelector(".artdeco-entity-lockup__subtitle")
                  ?.querySelector("a")?.href;
                const jobCompanyUrlSplit = jobCompanyUrl?.split(
                  LINKEDIN_PAGE_ENUM.SALES_COMPANY,
                )[1];
                jobCompanyID = jobCompanyUrlSplit?.split("?")[0];
              }

              const job = mainComponent
                ?.querySelector(".artdeco-entity-lockup__subtitle")
                ?.querySelector("span")
                ?.textContent?.trim();
              const location = mainComponent
                ?.querySelector(".artdeco-entity-lockup__caption")
                ?.textContent?.trim();
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
                  <UserSearchControlButton
                    job={job}
                    company={companyName}
                    jobCompanyId={jobCompanyID}
                    location={location}
                    name={userName}
                    description={description}
                    image={image}
                    url={LinkProfile?.href}
                  />,
                  idForLinkedinIconElelement,
                );
              }
            });
          }
        }, 1000);
      }
    }
  };

  return {
    addForUserSearch,
    addControlForUser,
    addControlForUserSales,
    addForSalesUserSearch,
  };
};
