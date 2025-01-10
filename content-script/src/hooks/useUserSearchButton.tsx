import React from "react";
import ReactDOM from "react-dom";
import { UserSearchControlButton, UserControlButton } from "../components";
import { LINKEDIN_PAGE_ENUM } from "../types/global.types";
import { UserSearchControlButtonSales } from "../components/ControlButtons";

export const useUserSearchButton = () => {
  const addForUserSearch = async () => {
    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.PEOPLE_SEARCH)) {
      // const list = document.querySelector(`[role="list"]`)
      const usernames = document.querySelectorAll(
        `[data-view-name="search-entity-result-universal-template"]`,
      );
      usernames.forEach((user) => {
        const LinkProfile = user?.querySelectorAll("a")[1].parentElement
          ?.parentElement as HTMLElement;
        user?.classList?.add("noOverflow");
        const image = user.querySelector("img")?.src;
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
          ReactDOM.render(
            <UserSearchControlButton
              image={
                image ||
                "https://media.licdn.com/dms/image/v2/D4E12AQEud3Ll5MI7cQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1660833954461?e=1740009600&v=beta&t=z1ZPpcRRRe2AhWy78-6UorS1EL_7A1jd4H02peab70E"
              }
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
                  <UserSearchControlButtonSales
                    job={job}
                    company={companyName}
                    jobCompanyId={jobCompanyID}
                    location={location}
                    name={userName}
                    description={description}
                    image={image}
                    url={LinkProfile?.href}
                    id={LinkProfile?.href}
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
