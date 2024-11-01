import React, { useEffect } from "react";
import { useStore } from "../store";
import { SelectUser, UserExist, UserNotExist } from "../pages/User/components";
import { getDataverse } from "../api";
import { fixUserLinkedinUrl } from "../utils/fixUrl.util";
import { EXIST_PAGE_PAGINATION, PAGE_ENUM } from "../types/global.types";

export const useUserExist = () => {
  const {
    uds_linkedin,
    customerId,
    setUserBackendData,
    setUserBackendDataWithNames,
    setPage,
    setErrorText,
    fullname,
    setCompanyBackendData,
    webApiEndpoint,
    userBackendData,
    accessToken,
    uds_salesnavigatoruserurl,
    customer,
    setUserPagination,
    userPagination,
  } = useStore();

  const getCustomerWithId = async () => {
    const query = `accountid eq ${userBackendData?._parentcustomerid_value}`;
    const encodedQuery = encodeURIComponent(query);
    const existWithID = await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery}`,
      accessToken,
    );
    setCompanyBackendData(existWithID.value[0]);
  };

  useEffect(() => {
    if (userBackendData?._parentcustomerid_value) {
      getCustomerWithId();
    }
  }, [userBackendData]);

  const getUsersWithNames = async (LIMIT: number = 5) => {
    const existWithName = await getDataverse(
      `${webApiEndpoint}/contacts?$filter=contains(fullname,'${fullname}')&$top=${LIMIT}`,
      accessToken,
    );
    if (existWithName.error) {
      setPage(PAGE_ENUM.ERROR);
      setErrorText(existWithName.error);
    } else {
      if (existWithName.value.length !== 0) {
        setUserBackendDataWithNames(existWithName.value);
        setUserPagination(EXIST_PAGE_PAGINATION.SELECT);
      } else {
        setUserPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
      }
    }
  };

  const getCustomerWithCustomerId = async () => {
    const query = `contains(uds_linkedincompanyid,'${customerId}')`;
    const encodedQuery = encodeURIComponent(query);
    let existWithID = await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery}`,
      accessToken,
    );
    if (existWithID && existWithID.value.length === 0) {
      const query = `contains(name,'${customer.trim()}'))`;
      const encodedQuery = encodeURIComponent(query);
      existWithID = await getDataverse(
        `${webApiEndpoint}/accounts?$filter=${encodedQuery}`,
        accessToken,
      );
    }

    setCompanyBackendData(existWithID.value ? existWithID.value[0] : null);
    return;
  };

  const checkUserExist = async () => {
    if ((uds_linkedin && fullname) || (uds_salesnavigatoruserurl && fullname)) {
      const query = `contains(${uds_linkedin ? "uds_linkedin" : "uds_salesnavigatoruserurl"},'${uds_linkedin ? fixUserLinkedinUrl(uds_linkedin.replace(/\/$/, "")) : fixUserLinkedinUrl(uds_salesnavigatoruserurl)}')`;
      const encodedQuery = encodeURIComponent(query);
      const response = await getDataverse(
        `${webApiEndpoint}/contacts?$filter=${encodedQuery}`,
        accessToken,
      );
      if (customerId) {
        await getCustomerWithCustomerId();
      }

      if (!response.error) {
        if (response.value.length === 0) {
          getUsersWithNames();
        } else {
          setUserBackendData(response.value[0]);
          setUserPagination(EXIST_PAGE_PAGINATION.EXIST);
        }
      } else {
        setPage(PAGE_ENUM.ERROR);
        const typedError = response.error as Error;
        setErrorText(typedError.message);
      }
    }
  };

  const generateUserScrapePage = () => {
    switch (userPagination) {
      case EXIST_PAGE_PAGINATION.SELECT:
        return <SelectUser />;
      case EXIST_PAGE_PAGINATION.EXIST:
        return <UserExist />;
      case EXIST_PAGE_PAGINATION.NOT_EXIST:
        return <UserNotExist />;
      default:
        <></>;
    }
  };

  return {
    checkUserExist,
    getCustomerWithId,
    generateUserScrapePage,
    getUsersWithNames,
  };
};