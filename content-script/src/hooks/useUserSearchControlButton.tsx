import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import { checkIfUserExistOrNotSearch } from "../utils/userSearch";
import { CreateUserRequestType } from "../api/api.types";
import { createDataverse } from "../api";

export const useUserSearchControlButton = (
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
    setCustomer,
    setCustomerId,
  } = useStore();
  const [ifExist, setIfExist] = useState(null);
  const [showMainInfoDetail, setShowMainInfoDetail] = useState(false);
  const [showQuickCaptureDetail, setQuickShowCaptureDetail] = useState(false);
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
                ? response.userData[0]
                : null,
            existedUsersCompanyData:
              response.companyData && response.companyData.length !== 0
                ? response.companyData[0]
                : null,
          });
        },
      );
    }
  }, [url, webApiEndpoint, accessToken]);

  const handleClickControlIcon = () => {
    setLoading(true);
    setCompanyBackendData(null);
    setCompanyName("");
    setCompanyBackendDataWithNames(null);
    setCompanyBackendDataForSelect(null);
    setResetUser();
    setTimeout(() => {
      setUserLinkedin(url ? url : "");
      setFullname(name);
      setJobTitle(job);
      setUserAdress(location);
      setUserProfileImage(image);
      setDescription(description);
      setCustomer(company);
      setCustomerId(jobCompanyId);
      const selectedUser = searchControlData.filter(
        (data) => data.id === image,
      )[0];
      setDataForReloadingUser(selectedUser);
      if (selectedUser.existedData) {
        setUserBackendData(selectedUser.existedData);
      }
      if (selectedUser.existedUsersCompanyData) {
        setCompanyBackendData(selectedUser.existedUsersCompanyData);
      }
      setSidebarOpen(true);
      setLoading(false);
    }, 200);
  };

  const handleClickQuickFetch = async () => {
    if (name) {
      const fullnameArray = name.split(" ");
      const userRequest: Partial<CreateUserRequestType> = {
        firstname: fullnameArray[0],
        lastname: fullnameArray
          .filter((_, i) => i > 0)
          .join(" ")
          .trim(),
        fullname: name,
        jobtitle: job,
        address1_name: location,
        uds_linkedin: url,
      };

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
