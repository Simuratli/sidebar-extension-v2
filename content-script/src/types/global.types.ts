export enum PAGE_ENUM {
  SETUP = "setup",
  LOGIN = "login",
  USER = "user",
  COMPANY = "company",
  ERROR = "error",
  SOMETHING_WENT_WRONG = "somethingWentWrong",
  WRONG_PAGE = "wrongPage",
  SEARCH_PEOPLE_SCRAPE = "searchPeoplescrape",
  SEARCH_COMPANY_SCRAPE = "searchCompanyscrape",
  SALES_SEARCH_COMPANY_SCRAPE = "searchCompanyscrapesales",
  SALES_SEARCH_USER_SCRAPE = "searchUserscrapesales",
}

export enum BUTTON_ENUM {
  GOLD = "gold",
  BLUE = "blue",
  LOGOUT = "logout",
  RELOAD = "reload",
}

export enum LINKEDIN_PAGE_ENUM {
  LINKEDIN = "https://www.linkedin.com/",
  SALES = "https://www.linkedin.com/sales/",
  COMPANY = "https://www.linkedin.com/company/",
  SALES_COMPANY = "https://www.linkedin.com/sales/company/",
  USER = "https://www.linkedin.com/in/",
  SALES_USER = "https://www.linkedin.com/sales/lead/",
  MICROSOFT_LOGIN = "https://login.microsoftonline.com/",
  CONTACT_INFO = "overlay/contact-info/",
  PEOPLE_SEARCH = "https://www.linkedin.com/search/results/people/",
  COMPANY_SEARCH = "https://www.linkedin.com/search/results/companies/",
  SALES_USER_SEARCH = "https://www.linkedin.com/sales/search/people",
  SALES_COMPANY_SEARCH = "https://www.linkedin.com/sales/search/company",
  USER_ABOUT_PROFILE = "/overlay/about-this-profile/",
}

export enum EXIST_PAGE_PAGINATION {
  EXIST = "exist",
  NOT_EXIST = "notExist",
  SELECT = "select",
}

export enum INPUT_TYPES {
  NORMAL = "normal",
  WITH_LABEL = "withLabel",
  IN_TABLE = "inTable",
}

export enum ACCESS_TOKEN_ENUM {
  REFRESH = "refresh",
  BASIC = "basic",
}

export enum MESSAGE_ENUMS {
  SOMETHING_WENT_WRONG = "somethingWentWrong",
  TOKEN_EXPIRED = "refresh",
  ERROR_ACTION = "errorHappen",
  RELOAD_EXTENSION = "reloadExtension",
  TAB_UPDATED = "updateTabUrl",
  HANDLE_LOGIN_TRIGGERED = "handleLoginTriggered",
  ACCESS_TOKEN_GOES_BACK = "accessTokenGoesBack",
  REFRESS_TOKEN = "refresh",
  LOGOUT = "logout",
  CREDENTIALS = "CREDENTIALS",
}

export enum ERROR_PAGE_TYPE {
  LOGIN = "login",
  ACTION = "action",
}

export enum STORAGED_ENUM {
  CLIENT_ID = "clientId",
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  REFRESH_TIME = "refressTime",
  AUTH_TOKEN = "authToken",
  TENANT_ID = "tenantId",
  CRM_URL = "crmUrl",
  CHALLENGE = "challenge",
}

export enum COMPANY_FIELDS {
  COMPANY_NAME = "name",
  COMPANY_IMAGE = "companyImage",
  NUMBER_OF_EMPLOYEES = "numberofemployees",
  UDS_LINKEDIN_PROFILE_COMPANY = "uds_linkedinprofilecompanyurl",
  UDS_SALES_PROFILE_COMPANY = "uds_salesnavigatorcompanyurl",
  COMPANY_ADDRESS = "companyAddress1_name",
  COMPANY_SIZE = "companySize",
  COMPANY_WEBSITE_URL = "websiteurl",
  COMPANY_DESCRIPTION = "companyDescription",
}

export enum USER_FIELDS {
  FULLNAME = "fullname",
  USER_IMAGE = "userImage",
  CUSTOMER = "customer",
  UDS_LINKEDIN_PROFILE_USER = "uds_linkedin",
  UDS_SALES_PROFILE_USER = "uds_salesnavigatorcompanyurl",
  BIRTHDAY = "birthday",
  WORK_PHONE = "telephone1",
  MOBILE_PHONE = "mobilephone",
  PERSONAL_EMAIL = "emailaddress2",
  EMAIL = "emailaddress1",
  JOB_TITLE = "jobtitle",
  ADRESS = "userAddress1_name",
  DESCRIPTION = "description",
}

export enum FIELD_TYPE {
  EMAIL = "email",
  STRING = "string",
  URL = "url",
  NUMBER = "number",
  DATE = "date",
}

export enum TEXTAREA_ENUM {
  NORMAL = "normal",
  IN_TABLE = "inTable",
}

export enum APP_LOCATION {
  COMPANY = "company",
  USER = "user",
}

export enum IN_OUT {
  INNER = "inner",
  OUTER = "outer",
}

export enum DROPDOWN_TYPE {
  SINGLE = "single",
  NOT_SINGLE = "notSingle",
}

export enum CONTROL_ICONS_TYPE {
  CAPTURE_EXIST = "CAPTURE_EXIST",
  CAPTURE_NOEXIST = "CAPTURE_NOEXIST",
  LOGIN = "LOGIN",
  REDIRECT = "REDIRECT",
  QUICK = "QUICK",
  SEARCH = "SEARCH",
}
