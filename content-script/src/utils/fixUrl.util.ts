import { LINKEDIN_PAGE_ENUM } from "../types/global.types";
export const fixUserLinkedinUrl = (uds_linkedin: string) => {
  if (uds_linkedin.includes(LINKEDIN_PAGE_ENUM.CONTACT_INFO)) {
    return uds_linkedin.split(LINKEDIN_PAGE_ENUM.CONTACT_INFO)[0];
  } else if (uds_linkedin.includes(LINKEDIN_PAGE_ENUM.USER_ABOUT_PROFILE)) {
    return uds_linkedin.split(LINKEDIN_PAGE_ENUM.USER_ABOUT_PROFILE)[0];
  } else {
    return uds_linkedin;
  }
};
