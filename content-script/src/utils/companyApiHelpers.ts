export const createRequestDataForCreateCompany = (
  uds_linkedinprofilecompanyurl: string,
  uds_linkedincompanyid: string | null | undefined,
  name?: string,
  numberofemployees?: number,
  companyAddress1_name?: string,
  websiteurl?: string | null | undefined,
  companySize?: number,
  companyDescription?: string | null,
) => {
  return {
    uds_linkedinprofilecompanyurl: uds_linkedinprofilecompanyurl,
    uds_linkedincompanyid: uds_linkedincompanyid,
    name: name ? name : `No Name ${Math.random()}`,
    numberofemployees: numberofemployees ? numberofemployees : 0,
    address1_name: companyAddress1_name ? companyAddress1_name : "",
    websiteurl: websiteurl ? websiteurl : "",
    uds_linkedinsize: companySize ? companySize : 0,
    description: companyDescription ? companyDescription : "",
  };
};
