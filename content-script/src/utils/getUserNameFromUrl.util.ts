import { LINKEDIN_PAGE_ENUM } from "../types/global.types";

export const getUserNameFromUrl = (previousUrl: string, currentUrl: string) => {
  let previousURLName = previousUrl.split(LINKEDIN_PAGE_ENUM.USER)[1];
  previousURLName = previousURLName.split("/")[0];
  let currentUrlName = currentUrl.split(LINKEDIN_PAGE_ENUM.USER)[1];
  currentUrlName = currentUrlName.split("/")[0];
  return currentUrlName === previousURLName;
};

export const getCompanyNameFromUrl = (
  previousUrl: string,
  currentUrl: string,
) => {
  let previousURLName = previousUrl.split(LINKEDIN_PAGE_ENUM.COMPANY)[1];
  previousURLName = previousURLName.split("/")[0];
  let currentUrlName = currentUrl.split(LINKEDIN_PAGE_ENUM.COMPANY)[1];
  currentUrlName = currentUrlName.split("/")[0];
  return currentUrlName === previousURLName;
};
