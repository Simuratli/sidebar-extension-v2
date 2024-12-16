import React, { useState } from "react";
import { useStore } from "../store";
import { BackendUserInterface, CreateUserRequestType } from "../api/api.types";
import { formatDateForBackend } from "../utils/time.utils";
import { createDataverse } from "../api";
import { APP_LOCATION, PAGE_ENUM } from "../types/global.types";
import { openInCrm } from "../utils/openCrm.util";
import { useCreateCompany } from "../hooks/useCreateCompany";
import { SearchControlStateObject } from "../store/searchControl";

export const useSaveUser = () => {
  const { createCompanyForUser, createCompanyForUserOnupdate } =
    useCreateCompany();
  const {
    fullname,
    uds_linkedin,
    uds_salesnavigatoruserurl,
    jobtitle,
    userAddress1_name,
    description,
    webApiEndpoint,
    userBackendData,
    accessToken,
    telephone1,
    mobilephone,
    emailaddress1,
    emailaddress2,
    birthday,
    setLoading,
    customer,
    customerId,
    setPage,
    searchControlData,
    setErrorText,
    companyBackDataForSelect,
    setSearchControlData,
    setCompanyBackendData,
    setUserBackendData,
    crmUrl,
    companyBackData,
    name,
  } = useStore();

  const saveUser = async (method: "POST" | "PATCH", companyID?: string) => {
    const fullnameArray = fullname.split(" ");
    const userRequest: Partial<CreateUserRequestType> = Object.fromEntries(
      Object.entries({
        firstname: fullnameArray[0],
        lastname: fullnameArray
          .filter((_, i) => i > 0)
          .join(" ")
          .trim(),
        fullname: fullname,
        jobtitle: jobtitle,
        address1_name: userAddress1_name,
        telephone1: telephone1,
        mobilephone: mobilephone,
        emailaddress1: emailaddress1,
        emailaddress2: emailaddress2,
        description: description,
        uds_linkedin: uds_linkedin,
        uds_salesnavigatoruserurl: uds_salesnavigatoruserurl,
        birthdate: birthday ? formatDateForBackend(birthday) : null,
      }),
    );

    if (companyID) {
      userRequest["parentcustomerid_account@odata.bind"] =
        `/accounts(${companyID})`;
    }

    const response = await createDataverse(
      `${webApiEndpoint}/contacts${method === "PATCH" ? `(${userBackendData?.contactid})` : ""}`,
      accessToken,
      userRequest,
      method,
    );

    return response;
  };

  const [isCreated, setIsCreated] = useState(false);
  const [createdUser, setCreatedUser] = useState<BackendUserInterface | null>(
    null,
  );

  const updateUserDataAfterRequest = (response: BackendUserInterface) => {
    const newSearchUrl = searchControlData.map(
      (data: SearchControlStateObject) => ({
        ...data,
        exist: data.url === uds_linkedin ? true : data.exist,
        existedData: data.url === uds_linkedin ? response : data.existedData,
        existedUsersCompanyData:
          data.url === uds_linkedin
            ? companyBackDataForSelect
            : data.existedUsersCompanyData,
      }),
    );
    setSearchControlData(newSearchUrl);
    setIsCreated(true);
    setCreatedUser(response);
    setUserBackendData(response);
    companyBackDataForSelect && setCompanyBackendData(companyBackDataForSelect);
  };

  const createCompanyBeforeUser = async (method: "POST" | "PATCH") => {
    const response =
      method === "PATCH"
        ? await createCompanyForUserOnupdate()
        : await createCompanyForUser();
    setCompanyBackendData(response);
    const responseUser = await saveUser(method, response.accountid);
    if (responseUser.error) {
      setPage(PAGE_ENUM.ERROR);
      setErrorText(responseUser.error);
    } else {
      setUserBackendData(responseUser);
      updateUserDataAfterRequest(responseUser);
    }
  };

  const handleClickSaveButtonUser = async (method: "POST" | "PATCH") => {
    setLoading(true);
    if (method === "POST") {
      if (customer || companyBackDataForSelect || customerId) {
        if (companyBackDataForSelect) {
          const responseUser = await saveUser(
            "POST",
            companyBackDataForSelect.accountid,
          );
          if (responseUser.error) {
            setPage(PAGE_ENUM.ERROR);
            setErrorText(responseUser.error);
          } else {
            setUserBackendData(responseUser);
            updateUserDataAfterRequest(responseUser);
          }
        } else if (customer || customerId) {
          await createCompanyBeforeUser("POST");
        }
      } else {
        const response = await saveUser("POST");
        if (response.error) {
          setPage(PAGE_ENUM.ERROR);
          setErrorText(response.error);
        } else {
          updateUserDataAfterRequest(response);
        }
      }
    } else {
      if (companyBackData || name || companyBackDataForSelect) {
        if (companyBackData) {
          if (name !== companyBackData.name && name !== "") {
            await createCompanyBeforeUser("PATCH");
          } else {
            const responseOfUser = await saveUser(
              "PATCH",
              companyBackData.accountid,
            );
            if (responseOfUser.error) {
              setPage(PAGE_ENUM.ERROR);
              setErrorText(responseOfUser.error);
            } else {
              updateUserDataAfterRequest(responseOfUser);
            }
          }
        } else if (companyBackDataForSelect) {
          const responseOfUser = await saveUser(
            "PATCH",
            companyBackDataForSelect?.accountid,
          );
          if (responseOfUser.error) {
            setPage(PAGE_ENUM.ERROR);
            setErrorText(responseOfUser.error);
          } else {
            updateUserDataAfterRequest(responseOfUser);
          }
        } else if (name) {
          await createCompanyBeforeUser("PATCH");
        }
      } else {
        const response = await saveUser("PATCH");

        if (response.error) {
          setPage(PAGE_ENUM.ERROR);
          setErrorText(response.error);
        } else {
          updateUserDataAfterRequest(response);
        }
      }
    }
    setLoading(false);
  };

  const handleClickOpenUser = () => {
    openInCrm(
      crmUrl,
      APP_LOCATION.USER,
      userBackendData?.contactid ? userBackendData?.contactid : "",
    );
  };

  return {
    saveUser,
    handleClickSaveButtonUser,
    isCreated,
    handleClickOpenUser,
  };
};
