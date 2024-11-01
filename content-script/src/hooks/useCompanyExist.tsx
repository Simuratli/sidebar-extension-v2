import React from "react";
import { useStore } from "../store";
import { getDataverse } from "../api";
import { BackendCompanyInterface } from "../api/api.types";
import { EXIST_PAGE_PAGINATION } from "../types/global.types";
import { removeUnnecessaryIcons } from "../utils/url.utils";

export const useCompanyExist = () => {
  const {
    setLoading,
    uds_linkedincompanyid,
    webApiEndpoint,
    accessToken,
    name,
    setCompanyBackendDataWithNames,
    setCompanyPagination,
    setCompanyBackendData,
  } = useStore();

  const getCompaniesWithNames = async (LIMIT: number = 5) => {
    if (name) {
      const existWithName = await getDataverse(
        `${webApiEndpoint}/accounts?$filter=contains(name,'${encodeURIComponent(name)}')&$top=${LIMIT}`,
        accessToken,
      );

      console.log(existWithName, "exiasnd");
      if (existWithName.value && existWithName.value.length !== 0) {
        setCompanyBackendDataWithNames(existWithName.value);
        setCompanyPagination(EXIST_PAGE_PAGINATION.SELECT);
      } else {
        setCompanyPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
      }
    } else {
      setCompanyPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
    }
    return "";
  };
  const checkCompanyExist = async () => {
    setLoading(true);
    const query = `contains(uds_linkedincompanyid,'${uds_linkedincompanyid}')`;
    const encodedQuery = encodeURIComponent(query);
    let existWithID = await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery}`,
      accessToken,
    );

    if (existWithID.value && existWithID.value.length >= 1) {
      existWithID.value.map((elem: BackendCompanyInterface) => {
        if (elem.uds_linkedincompanyid === uds_linkedincompanyid) {
          existWithID = {
            value: [elem],
          };
        }
      });
    }

    if (
      existWithID.value &&
      (existWithID.value.length === 0 || !existWithID.value)
    ) {
      getCompaniesWithNames();
    } else {
      setCompanyBackendData(existWithID.value[0]);
      setCompanyPagination(EXIST_PAGE_PAGINATION.EXIST);
    }
  };
  return {
    checkCompanyExist,
    getCompaniesWithNames,
  };
};
