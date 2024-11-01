import { useStore } from "../store";
import {
  APP_LOCATION,
  EXIST_PAGE_PAGINATION,
  IN_OUT,
  DROPDOWN_TYPE,
  PAGE_ENUM,
} from "../types/global.types";
import {
  BackendCompanyInterface,
  BackendUserInterface,
} from "../api/api.types";
export function useDropdown(
  inOut: IN_OUT,
  location: APP_LOCATION,
  onCreateNew?: () => void,
  setOpen?: React.Dispatch<boolean>,
  type?: DROPDOWN_TYPE,
) {
  const {
    companyBackDataWithNames,
    userBackendDataWithNames,
    setCompanyPagination,
    setUserPagination,
    setUserBackendData,
    setCompanyBackendData,
    setCompanyName,
    setAccountid,
    setPage,
    setCompanyBackendDataWithNames,
    setUserBackendDataWithNames,
    setCompanyBackendDataForSelect,
  } = useStore();

  const goToCreateNew = () => {
    if (inOut === IN_OUT.OUTER) {
      if (location === APP_LOCATION.COMPANY) {
        setPage(PAGE_ENUM.COMPANY);
        setCompanyBackendDataWithNames(null);
        setCompanyPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
      } else {
        setPage(PAGE_ENUM.USER);
        setUserBackendDataWithNames(null);
        setUserPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
      }
    } else {
      onCreateNew && onCreateNew();
      setOpen && setOpen(false);
      if (type === DROPDOWN_TYPE.SINGLE) {
        const dropdownInput = document.getElementById("dropdown");
        dropdownInput?.focus();
      }
    }
  };

  const actionForOuterCompany = (id: string) => {
    const filteredCompanyData: BackendCompanyInterface | undefined =
      companyBackDataWithNames?.filter(
        (companyData) => companyData.accountid === id,
      )[0];
    if (filteredCompanyData) {
      setCompanyBackendData(filteredCompanyData);
      setCompanyPagination(EXIST_PAGE_PAGINATION.EXIST);
    } else {
      setCompanyPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
    }
  };

  const actionForOuterUser = (id: string) => {
    const filteredUserData: BackendUserInterface | undefined =
      userBackendDataWithNames?.filter(
        (companyData) => companyData.contactid === id,
      )[0];
    if (filteredUserData) {
      setUserBackendData(filteredUserData);
      setUserPagination(EXIST_PAGE_PAGINATION.EXIST);
    } else {
      setUserPagination(EXIST_PAGE_PAGINATION.NOT_EXIST);
    }
  };

  const handleClickEdit = (id: string) => {
    if (inOut === IN_OUT.OUTER) {
      if (location === APP_LOCATION.COMPANY) {
        actionForOuterCompany(id);
      } else {
        actionForOuterUser(id);
      }
    } else {
      if (location === APP_LOCATION.USER) {
        const filteredCompanyData: BackendCompanyInterface | null =
          companyBackDataWithNames?.filter(
            (companyData) => companyData.accountid === id,
          )[0] || null;
        setCompanyName(filteredCompanyData?.name);
        setAccountid(filteredCompanyData?.accountid);
        setCompanyBackendDataForSelect(filteredCompanyData);
        setOpen && setOpen(false);
      }
    }
  };

  return {
    handleClickEdit,
    goToCreateNew,
  };

  return {
    handleClickEdit,
    goToCreateNew,
  };
}
