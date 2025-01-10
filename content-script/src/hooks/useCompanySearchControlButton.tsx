import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import { createDataverse } from "../api";
import { checkIfCompanyExistOrNotSearch } from "../utils/userSearch";
import { LINKEDIN_PAGE_ENUM } from "../types/global.types";

export const useCompanySearchControlButton = (
  url: string,
  image: string,
  description: string,
  location: string,
  name: string,
  id: string,
  numberOfEmployees: number,
) => {
  const [ifExist, setIfExist] = useState(null);
  const [showMainInfoDetail, setShowMainInfoDetail] = useState(false);
  const [showQuickCaptureDetail, setQuickShowCaptureDetail] = useState(false);
  const {
    setCompanyAdress,
    setUserBackendData,
    setNumberOfEmployees,
    setLinkedinCompanyId,
    setCompanyDescription,
    setSearchControlCompanyData,
    setCompanyProfileImage,
    setCompanyProfileUrl,
    setSalesNavigatorCompanyUrl,
    setResetCompany,
    setCompanyName,
    setCompanyBackendData,
    accessToken,
    setLoading,
    webApiEndpoint,
    setSearchControlCompanyDataOneByOne,
    searchControlCompanyData,
    setSidebarOpen,
  } = useStore();

  useEffect(() => {
    if (!ifExist && accessToken) {
      checkIfCompanyExistOrNotSearch(
        name,
        id,
        webApiEndpoint,
        accessToken,
      ).then((response) => {
        setIfExist(response);
        setSearchControlCompanyDataOneByOne({
          companyName: name,
          description: description?.trim(),
          location: location,
          url: url,
          id: image,
          image: image,
          exist: response.value && response.value.length !== 0,
          existedData:
            response.value && response.value.length !== 0
              ? response.value[0]
              : null,
          companyId: id,
          numberOfEmployees: numberOfEmployees,
        });
      });
    }
  }, [url, webApiEndpoint, accessToken]);

  const handleClickQuickFetchCompany = async () => {
    setSidebarOpen(false);
    if (name) {
      const request: any = {
        uds_linkedinprofilecompanyurl: url,
        name: name ? name : `No Name ${Math.random()}`,
        description: description || "",
      };

      if (numberOfEmployees) {
        request["numberofemployees"] = numberOfEmployees;
      }
      if (location) {
        request["address1_name"] = location;
      }

      if (id) {
        request["uds_linkedincompanyid"] = id;
      }
      const response = await createDataverse(
        `${webApiEndpoint}/accounts`,
        accessToken,
        request,
        "POST",
      );

      setCompanyBackendData(response);
      const newSearchControlCompanyData = searchControlCompanyData.map(
        (data) => ({
          ...data,
          exist: data.url === url ? true : data.exist,
          existedData: data.url === url ? response : data.existedData,
        }),
      );
      setSearchControlCompanyData(newSearchControlCompanyData);
    }
  };

  const handleClickCompanyControl = async () => {
    setCompanyBackendData(null);
    setLoading(true);
    setResetCompany();
    setCompanyAdress(location);
    setCompanyDescription(description?.trim() || "");
    setCompanyProfileImage(image);
    window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES) ? setSalesNavigatorCompanyUrl(url!) : setCompanyProfileUrl(url!);
    setCompanyName(name);
    setLinkedinCompanyId(id);
    numberOfEmployees && setNumberOfEmployees(numberOfEmployees);
    setSidebarOpen(true);
    if (
      searchControlCompanyData.filter((data) => data.id === image)[0] &&
      searchControlCompanyData.filter((data) => data.id === image)[0].exist
    ) {
      setUserBackendData(null);
      setTimeout(() => {
        setCompanyBackendData(
          searchControlCompanyData.filter((data) => data.id === image)[0]
            .existedData || null,
        );
      }, 100);
    } else {
      setCompanyBackendData(null);
    }
    setLoading(false);
  };

  return {
    showMainInfoDetail,
    showQuickCaptureDetail,
    setShowMainInfoDetail,
    setQuickShowCaptureDetail,
    handleClickQuickFetchCompany,
    handleClickCompanyControl,
    ifExist,
    setIfExist,
  };
};
