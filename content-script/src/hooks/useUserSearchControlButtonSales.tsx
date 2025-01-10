import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import { checkIfUserExistOrNotSearch } from "../utils/userSearch";
import { CreateUserRequestType } from "../api/api.types";
import { createDataverse, getDataverse } from "../api";
import { PAGE_ENUM } from "../types/global.types";
import { useCreateCompany } from "./useCreateCompany";
import { extractNameAndSurname } from "../utils/removeEmojis";
export const useUserSearchControlButtonSales = (
  url: string,
  name: string,
  job: string,
  location: string,
  image: string,
  company: string,
  description: string,
  jobCompanyId: string,
) => {
  const {
    webApiEndpoint,
    accessToken,
    setSearchControlDataOneByOne,
    setSidebarOpen,
    searchControlData,
    setSearchControlData,
    setUserBackendData,
    setCompanyBackendData,
    setResetUser,
    setLoading,
    setUserLinkedin,
    setFullname,
    setJobTitle,
    setUserAdress,
    setUserProfileImage,
    setDescription,
    setDataForReloadingUser,
    setCompanyName,
    setCompanyBackendDataForSelect,
    setCompanyBackendDataWithNames,
    setProfileBackground,
    setCustomer,
    setCustomerId,
    setPage,
    setErrorText,
    setLinkedinCompanyId,
  } = useStore();
  const [ifExist, setIfExist] = useState(null);
  const [showMainInfoDetail, setShowMainInfoDetail] = useState(false);
  const [showQuickCaptureDetail, setQuickShowCaptureDetail] = useState(false);
  const { saveCompany } = useCreateCompany();
  useEffect(() => {
    if (!ifExist && accessToken) {
      checkIfUserExistOrNotSearch(url, webApiEndpoint, accessToken).then(
        (response: any) => {
          setIfExist(response.userData);
          setSearchControlDataOneByOne({
            userName: name,
            job: job,
            location: location,
            url: url,
            id: image,
            image: image,
            exist: response.userData && response.userData.length !== 0,
            existedData:
              response.userData && response.userData.length !== 0
                ? response.userData
                : null,
            existedUsersCompanyData:
              response.companyData && response.companyData.length !== 0
                ? response.companyData
                : null,

            currentCompany: company,
            currentCompanyId: jobCompanyId,
            firstName: undefined,
            lastName: undefined,
            publicIdentifier: undefined,
            summary: undefined,
            mobile: undefined,
            email: undefined,
          });
        },
      );
    }
  }, [url, webApiEndpoint, accessToken]);

  const handleClickControlIcon = async () => {
    setLoading(true);
    setCompanyBackendData(null);
    setCompanyName("");
    setLinkedinCompanyId(null);
    setCompanyBackendDataWithNames(null);
    setCompanyBackendDataForSelect(null);
    setResetUser();
    setProfileBackground(null);
    setTimeout(async () => {
      setUserLinkedin(url ? url : "");
      setFullname(name);
      setJobTitle(job);
      setUserAdress(location);
      setUserProfileImage(image);
      setDescription(description);
      setCustomer(company);
      setCompanyName(company);
      setCustomerId(jobCompanyId);
      setLinkedinCompanyId(jobCompanyId);
      const selectedUser = searchControlData.filter(
        (data) => data.id === image,
      )[0];
      setDataForReloadingUser(selectedUser);
      if (selectedUser.existedData) {
        setUserBackendData(selectedUser.existedData);
      }
      if (selectedUser.existedUsersCompanyData) {
        setCompanyBackendData(selectedUser.existedUsersCompanyData);
      } else {
        if (jobCompanyId) {
          let isCompanyExist = await getDataverse(
            `${webApiEndpoint}/accounts?$filter=contains(uds_linkedincompanyid,'${jobCompanyId}')`,
            accessToken,
          );
          if (isCompanyExist.error) {
            setPage(PAGE_ENUM.ERROR);
            const typedError = isCompanyExist.error as Error;
            setErrorText(typedError.message);
            setLoading(false);
          }

          if (isCompanyExist.value.length > 0) {
            setCompanyBackendData(isCompanyExist.value[0]);
          }
        }
      }
      setSidebarOpen(true);
      setLoading(false);
    }, 200);
  };

  const handleClickQuickFetch = async () => {
    setSidebarOpen(false);
    const details = searchControlData.filter((user) => user.id === image)[0];
    if (details) {
      const fullName = extractNameAndSurname(details.userName!).split(" ");
      const userRequest: Partial<CreateUserRequestType> = {
        fullname: extractNameAndSurname(details.userName!),
        firstname: fullName[0],
        lastname: fullName
          .filter((_, i) => i > 0)
          .join(" ")
          .trim(),
        jobtitle: details.job,
        address1_name: details?.location,
        uds_linkedin: details.url,
        emailaddress2: details?.email,
        description: details.summary,
        telephone1: details.mobile!,
      };

      if (details?.existedUsersCompanyData) {
        userRequest["parentcustomerid_account@odata.bind"] =
          `/accounts(${details.existedUsersCompanyData?.accountid})`;
      } else {
        if (details.currentCompanyId) {
          let isCompanyExist = await getDataverse(
            `${webApiEndpoint}/accounts?$filter=contains(uds_linkedincompanyid,'${details.currentCompanyId}')`,
            accessToken,
          );

          if (isCompanyExist.error) {
            setPage(PAGE_ENUM.ERROR);
            const typedError = isCompanyExist.error as Error;
            setErrorText(typedError.message);
            setLoading(false);
          }

          if (isCompanyExist.value.length > 0) {
            userRequest["parentcustomerid_account@odata.bind"] =
              `/accounts(${isCompanyExist.value[0]?.accountid})`;
            setCompanyName(isCompanyExist.value[0].name);
            setCompanyBackendData(isCompanyExist.value[0]);
          } else {
            const response = await saveCompany("POST", {
              name: details.currentCompany!,
              uds_linkedincompanyid: details.currentCompanyId!,
            });
            if (response.error) {
              setPage(PAGE_ENUM.ERROR);
              const typedError = isCompanyExist.error as Error;
              setErrorText(typedError.message);
              setLoading(false);
            }
            setCompanyName(response?.name!);
            setCompanyBackendData(response);
            userRequest["parentcustomerid_account@odata.bind"] =
              `/accounts(${response?.accountid})`;
          }
        }
      }

      const response = await createDataverse(
        `${webApiEndpoint}/contacts`,
        accessToken,
        userRequest,
        "POST",
      );
      setUserBackendData(response);
      const newSearchUrl = searchControlData.map((data) => ({
        ...data,
        exist: data.url === url ? true : data.exist,
        existedData: data.url === url ? response : data.existedData,
      }));

      setSearchControlData(newSearchUrl);
    }
  };

  return {
    handleClickQuickFetch,
    handleClickControlIcon,
    ifExist,
    setIfExist,
    showMainInfoDetail,
    setShowMainInfoDetail,
    showQuickCaptureDetail,
    setQuickShowCaptureDetail,
  };
};
