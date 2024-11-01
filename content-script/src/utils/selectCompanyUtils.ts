import {
  BackendCompanyInterface,
  BackendUserInterface,
} from "../api/api.types";
import { DropdownData } from "../components/Dropdown/Dropdown.types";

export const createArrayForNewFieldCompany = (
  companyAddress1_name?: string | null,
  websiteurl?: string | null,
  uds_linkedinprofilecompanyurl?: string | null,
  uds_salesnavigatorcompanyurl?: string | null,
) => {
  return [
    ...(companyAddress1_name ? [companyAddress1_name] : []),
    ...(websiteurl ? [websiteurl] : []),
    uds_linkedinprofilecompanyurl,
    ...(uds_salesnavigatorcompanyurl ? [uds_salesnavigatorcompanyurl] : []),
  ].filter(Boolean) as string[];
};

export const createDataForExistedNamesCompany = (
  existedData: BackendCompanyInterface[] | null,
) => {
  const data: DropdownData[] = [];

  existedData &&
    existedData.map((item) => {
      data.push({
        name: item.name,
        id: item.accountid,
        data: createArrayForNewFieldCompany(
          item.address1_name,
          item.websiteurl,
          item.uds_linkedinprofilecompanyurl,
          item.uds_salesnavigatorcompanyurl,
        ),
      });
    });

  return data;
};

export const createDataForExistedNamesUser = (
  existedData: BackendUserInterface[] | null,
) => {
  const data: DropdownData[] = [];

  existedData &&
    existedData.map((item) => {
      data.push({
        name: item.fullname,
        id: item.contactid,
        data: createArrayForNewFieldCompany(
          item.address1_name,
          item.jobtitle,
          item.emailaddress1,
        ),
      });
    });

  return data;
};
