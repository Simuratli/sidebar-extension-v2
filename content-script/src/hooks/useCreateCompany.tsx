import React, { useState } from "react";
import { useStore } from "../store";
import { createDataverse } from "../api";
import {
  BackendCompanyInterface,
  CreateCompanyRequestType,
} from "../api/api.types";
import { createRequestDataForCreateCompany } from "../utils/companyApiHelpers";
import { PAGE_ENUM } from "../types/global.types";
import { checkDifferenceTrueFalse } from "../utils/checkExistedInputDifference.util";

export const useCreateCompany = () => {
  const [isCreated, setIsCreated] = useState(false);
  const [createdCompany, setCreatedCompany] =
    useState<BackendCompanyInterface | null>(null);
  const {
    customer,
    customerId,
    webApiEndpoint,
    accessToken,
    companyBackData,
    name,
    setLoading,
    uds_linkedinprofilecompanyurl,
    uds_linkedincompanyid,
    numberofemployees,
    companyAddress1_name,
    websiteurl,
    setPage,
    setErrorText,
    companySize,
    setSearchControlCompanyData,
    searchControlCompanyData,
    companyDescription,
    setCompanyBackendData,
    uds_salesnavigatorcompanyurl,
  } = useStore();

  const saveCompany = async (
    method: "POST" | "PATCH",
    request: Partial<CreateCompanyRequestType>,
  ) => {
    const response = await createDataverse(
      `${webApiEndpoint}/accounts${method === "PATCH" ? `(${companyBackData?.accountid})` : ""}`,
      accessToken,
      request,
      method,
    );

    return response;
  };

  const createCompanyForUser = async () => {
    const companyRequest: { name: string; uds_linkedincompanyid?: string } = {
      name: customer,
    };

    if (customerId) {
      companyRequest["uds_linkedincompanyid"] = customerId;
    }
    const response = await saveCompany("POST", companyRequest);
    return response;
  };

  const createCompanyForUserOnupdate = async () => {
    const companyRequest = {
      name: name,
    };

    // if (customerId) {
    //   companyRequest["uds_linkedincompanyid"] = customerId;
    // }
    const response = await saveCompany("POST", companyRequest);
    return response;
  };

  const createCompany = async () => {
    setLoading(true);
    const request = createRequestDataForCreateCompany(
      uds_linkedinprofilecompanyurl,
      uds_linkedincompanyid,
      name,
      numberofemployees,
      companyAddress1_name,
      websiteurl,
      companySize,
      companyDescription,
    );
    const response = await saveCompany("POST", request);
    if (response.error) {
      setPage(PAGE_ENUM.ERROR);
      setErrorText(response.error);
      setLoading(false);
      return false;
    }
    setCompanyBackendData(response);
    setCreatedCompany(response);
    setLoading(false);
    setIsCreated(true);
    const newSearchControlCompanyData = searchControlCompanyData.map(
      (data) => ({
        ...data,
        exist: data.url === uds_linkedinprofilecompanyurl ? true : data.exist,
        existedData:
          data.url === uds_linkedinprofilecompanyurl
            ? response
            : data.existedData,
      }),
    );
    setSearchControlCompanyData(newSearchControlCompanyData);
    return response;
  };

  const updateCurrentCompany = async () => {
    setLoading(true);
    const request = createRequestDataForCreateCompany(
      uds_linkedinprofilecompanyurl,
      uds_linkedincompanyid,
      name,
      numberofemployees,
      companyAddress1_name,
      websiteurl,
      companySize,
      companyDescription,
    );
    const response = await saveCompany("PATCH", request);
    if (response.error) {
      setPage(PAGE_ENUM.ERROR);
      setErrorText(response.error);
      setLoading(false);
    }

    setCompanyBackendData(response);
    setLoading(false);
  };

  const checkHaveDifferentValueForButton = () => {
    const urlChecker = uds_salesnavigatorcompanyurl
      ? checkDifferenceTrueFalse(
          uds_salesnavigatorcompanyurl,
          companyBackData?.uds_salesnavigatorcompanyurl,
        )
      : checkDifferenceTrueFalse(
          uds_linkedinprofilecompanyurl,
          companyBackData?.uds_linkedinprofilecompanyurl,
        );

    return (
      urlChecker ||
      checkDifferenceTrueFalse(
        uds_linkedinprofilecompanyurl,
        companyBackData?.uds_linkedinprofilecompanyurl,
      ) ||
      checkDifferenceTrueFalse(websiteurl, companyBackData?.websiteurl) ||
      checkDifferenceTrueFalse(
        numberofemployees,
        companyBackData?.numberofemployees,
      ) ||
      checkDifferenceTrueFalse(
        companySize,
        companyBackData?.uds_linkedinsize,
      ) ||
      checkDifferenceTrueFalse(
        companyAddress1_name,
        companyBackData?.address1_name,
      ) ||
      checkDifferenceTrueFalse(
        companyDescription,
        companyBackData?.description ? companyBackData?.description : "",
      )
    );
  };

  return {
    createCompanyForUser,
    createCompanyForUserOnupdate,
    createCompany,
    createdCompany,
    isCreated,
    checkHaveDifferentValueForButton,
    updateCurrentCompany,
  };
};
