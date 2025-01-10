import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import { checkIfUserExistOrNotSearch } from "../utils/userSearch";
import { CreateUserRequestType } from "../api/api.types";
import { createDataverse, getDataverse } from "../api";
import { ProfileData } from "../../../background/background";
import { useCreateCompany } from "./useCreateCompany";
import { PAGE_ENUM } from "../types/global.types";

export const useUserSearchControlButton = (url: string, image: string) => {
  const { saveCompany } = useCreateCompany();
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
    setPersonalEmail,
    setProfileBackground,
    setCustomer,
    setCustomerId,
    setPersonalPhone,
    setLinkedinCompanyId,
    setResetCompany,
    setPage,
    setErrorText,
  } = useStore();
  const [ifExist, setIfExist] = useState(null);
  const [showMainInfoDetail, setShowMainInfoDetail] = useState(false);
  const [showQuickCaptureDetail, setQuickShowCaptureDetail] = useState(false);

  const checkUserAndSave = async (userDetails: ProfileData) => {
    const { userData, companyData } = await checkIfUserExistOrNotSearch(
      `https://www.linkedin.com/in/${encodeURIComponent(userDetails.publicIdentifier!)}`,
      webApiEndpoint,
      accessToken,
    );

    if (userData && userData.error) {
      setPage(PAGE_ENUM.ERROR);
      const typedError = userData.error as string;
      setErrorText(typedError);
      setLoading(false);
    }else{
      
    if(userData)  setUserBackendData(userData.existedData);
    if(companyData) setCompanyBackendData(companyData)

    setSearchControlDataOneByOne({
      userName: `${userDetails?.firstName} ${userDetails?.lastName}`,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      job: `${userDetails?.headline}`,
      location: userDetails?.adress,
      email: userDetails?.email,
      url: `https://www.linkedin.com/in/${encodeURIComponent(userDetails.publicIdentifier!)}`,
      publicIdentifier: userDetails.publicIdentifier,
      id: userDetails.id,
      image: image,
      mobile: userDetails.MOBILE || null,
      summary: userDetails.summary,
      currentCompany: userDetails?.company,
      currentCompanyId: userDetails?.companyId,
      exist: !!userData,
      existedData: userData ? userData : null,
      existedUsersCompanyData:
        companyData && "accountid" in companyData ? companyData : null,
    });
    }


  };

  useEffect(() => {
    const userId = url.split("/in/")[1]?.split("?")[0];
    chrome.runtime.sendMessage({
      type: "FETCH_PROFILE_SEARCH",
      profileId: userId,
    });

    const messageListener = async (
      message: any,
      sender: any,
      sendResponse: any,
    ) => {
      if (message.type === "SEARCH_PROFILE_DATA_RESULT") {
        const userData: ProfileData = message.data;
        await checkUserAndSave(userData);
        sendResponse({ received: true }); //respond however you like
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const resetFunction = () => {
    setPersonalEmail(null);
    setDescription(null);
    setCompanyBackendData(null);
    setCompanyName("");
    setCompanyBackendDataWithNames(null);
    setCompanyBackendDataForSelect(null);
    setResetUser();
    setResetCompany();
    setProfileBackground(null);
    setPersonalPhone(null);
  };

  const handleClickControlIcon = () => {
    setLoading(true);
    const userId = url.split("/in/")[1]?.split("?")[0];
    const details = searchControlData.filter(
      (user) => encodeURIComponent(user.publicIdentifier!) === userId,
    )[0];
    resetFunction();
    if (details) {
      setTimeout(async () => {
        setUserLinkedin(url ? url : "");
        setFullname(details.userName);
        setJobTitle(details.job);
        setPersonalEmail(details.email);
        details.mobile && setPersonalPhone(details.mobile);
        setUserAdress(details.location);
        setUserProfileImage(image);
        setDescription(details.summary);
        setCustomer(details.currentCompany);
        setCustomerId(details.currentCompanyId);
        setCompanyName(details.currentCompany);
        setLinkedinCompanyId(details.currentCompanyId);
        const selectedUser = searchControlData.filter(
          (data) => data.id === details?.id,
        )[0];
        setDataForReloadingUser(selectedUser);

        if (!details.existedUsersCompanyData) {
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
            setCompanyBackendData(isCompanyExist.value[0]);
          }
        } else {
          setCompanyBackendData(selectedUser.existedUsersCompanyData);
        }

        if (selectedUser.existedData) {
          setUserBackendData(selectedUser.existedData);
        }

        setSidebarOpen(true);
        setLoading(false);
      }, 200);
    }
  };

  const handleClickQuickFetch = async () => {
    setSidebarOpen(false);
    const userId = url.split("/in/")[1]?.split("?")[0];
    const details = searchControlData.filter(
      (user) => encodeURIComponent(user.publicIdentifier!) === userId,
    )[0];
    if (details) {
      const userRequest: Partial<CreateUserRequestType> = {
        fullname: details.userName,
        firstname: details.firstName,
        lastname: details.lastName,
        jobtitle: details.job,
        address1_name: details?.location,
        uds_linkedin: `https://www.linkedin.com/in/${encodeURIComponent(details.publicIdentifier!)}`,
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
