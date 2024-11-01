export interface CreateCompanyRequestType {
  uds_linkedincompanyid?: string | null;
  name: string;
  numberofemployees: number;
  address1_name: string;
  websiteurl: string;
  uds_linkedinsize: number;
  description: string;
  uds_linkedinprofilecompanyurl: string;
}

export interface BackendCompanyInterface extends CreateCompanyRequestType {
  accountid: string;
  address1_addressid: string;
  createdon: string;
  uds_salesnavigatorcompanyurl: string | null;
}

export interface CreateUserRequestType {
  firstname: string;
  lastname: string;
  fullname: string;
  address1_name: string;
  jobtitle: string;
  _parentcustomerid_value: string;
  "parentcustomerid_account@odata.bind": string;
  telephone1: string;
  mobilephone: string;
  emailaddress1: string;
  emailaddress2: string;
  description: string;
  uds_linkedin: string;
  uds_salesnavigatoruserurl: string;
  customer: string;
  customerId: string;
  birthdate: string | null;
}

export interface BackendUserInterface extends CreateUserRequestType {
  contactid: string;
  address1_addressid: string;
  createdon: string;
}
