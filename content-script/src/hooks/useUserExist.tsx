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
    setCompanyBackendDataForSelect,
    setCompanyBackendDataWithNames,
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
      `${webApiEndpoint}/contacts?$filter=contains(fullname,'${fullname.replace(/'/g, " ")}')&$top=${LIMIT}`,
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
    let existWithID: any = null;

    if (customerId) {
      existWithID = await getDataverse(
        `${webApiEndpoint}/accounts?$filter=contains(uds_linkedincompanyid,'${customerId}')`,
        accessToken,
      );

      if (existWithID && existWithID.value.length !== 0) {
        setCompanyBackendData(existWithID.value ? existWithID.value[0] : null);
      }
    }

    if (existWithID && existWithID.value.length === 0) {
      existWithID = await getDataverse(
        `${webApiEndpoint}/accounts?$filter=contains(name,'${customer.trim()}')`,
        accessToken,
      );
      if (existWithID && existWithID.value.length !== 0) {
        setCompanyBackendDataWithNames(existWithID.value);
      }
    }

    return;
  };

  const checkUserExist = async () => {
    console.log("i am out on ifn eos", fullname, uds_salesnavigatoruserurl);

    if ((uds_linkedin && fullname) || (uds_salesnavigatoruserurl && fullname)) {
      console.log("i am in on ifn eos");
      const query = `contains(${uds_linkedin ? "uds_linkedin" : "uds_salesnavigatoruserurl"},'${uds_linkedin ? fixUserLinkedinUrl(uds_linkedin.replace(/\/$/, "")) : fixUserLinkedinUrl(uds_salesnavigatoruserurl)}')`;
      const encodedQuery = encodeURIComponent(query);
      const response = await getDataverse(
        `${webApiEndpoint}/contacts?$filter=${encodedQuery}`,
        accessToken,
      );
      console.log("check user no?");

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

  useEffect(() => {
    if (customer || customerId) {
      console.log("war customer", customer, customerId);
      getCustomerWithCustomerId();
    }
  }, [customer, customerId]);

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
