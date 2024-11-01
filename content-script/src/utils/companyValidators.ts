/* eslint-disable no-useless-escape */
import { COMPANY_FIELDS, FIELD_TYPE, USER_FIELDS } from "../types/global.types";

interface CompanyValidator {
  max: number;
  min?: number; // min is optional
  type: FIELD_TYPE;
  required?: boolean; // required is optional
}

export const companyValidators: Record<COMPANY_FIELDS, CompanyValidator> = {
  [COMPANY_FIELDS.COMPANY_NAME]: {
    max: 160,
    type: FIELD_TYPE.STRING,
    required: true,
  },
  [COMPANY_FIELDS.NUMBER_OF_EMPLOYEES]: {
    min: 0,
    max: 1000000000,
    type: FIELD_TYPE.NUMBER,
  },
  [COMPANY_FIELDS.COMPANY_ADDRESS]: {
    max: 200,
    type: FIELD_TYPE.STRING,
  },
  [COMPANY_FIELDS.COMPANY_SIZE]: {
    min: 0,
    max: 2147483647,
    type: FIELD_TYPE.NUMBER,
  },
  [COMPANY_FIELDS.COMPANY_WEBSITE_URL]: {
    max: 200,
    type: FIELD_TYPE.URL,
  },
  [COMPANY_FIELDS.COMPANY_DESCRIPTION]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
  },
  [COMPANY_FIELDS.UDS_LINKEDIN_PROFILE_COMPANY]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
  },
  [COMPANY_FIELDS.COMPANY_IMAGE]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
  },
  [COMPANY_FIELDS.UDS_SALES_PROFILE_COMPANY]: {
    max: 2000,
    type: FIELD_TYPE.URL,
  },
};

export const userValidators: Record<USER_FIELDS, CompanyValidator> = {
  [USER_FIELDS.FULLNAME]: {
    max: 100,
    type: FIELD_TYPE.STRING,
    required: true,
  },
  [USER_FIELDS.USER_IMAGE]: {
    max: 1000,
    type: FIELD_TYPE.STRING,
    required: true,
  },
  [USER_FIELDS.JOB_TITLE]: {
    max: 1000,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.ADRESS]: {
    max: 200,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.DESCRIPTION]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.BIRTHDAY]: {
    max: 10,
    type: FIELD_TYPE.DATE,
    required: false,
  },
  [USER_FIELDS.CUSTOMER]: {
    max: 160,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.EMAIL]: {
    max: 100,
    type: FIELD_TYPE.EMAIL,
    required: false,
  },
  [USER_FIELDS.PERSONAL_EMAIL]: {
    max: 100,
    type: FIELD_TYPE.EMAIL,
    required: false,
  },
  [USER_FIELDS.MOBILE_PHONE]: {
    max: 50,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.WORK_PHONE]: {
    max: 50,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.UDS_LINKEDIN_PROFILE_USER]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
    required: false,
  },
  [USER_FIELDS.UDS_SALES_PROFILE_USER]: {
    max: 2000,
    type: FIELD_TYPE.STRING,
    required: false,
  },
};

export const emailPattern =
  /^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
export const urlPattern =
  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
export const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
