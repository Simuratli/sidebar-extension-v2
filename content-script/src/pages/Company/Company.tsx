import React, { useEffect, useState } from "react";
import { useCompanyControlButton } from "../../hooks/useCompanyControlButton";
import { useCompanyScrape } from "../../hooks/useCompanyScrape";
import { useStore } from "../../store";
import { useCompanyExist } from "../../hooks/useCompanyExist";
import { ExistCompany, NotExistCompany, SelectCompany } from "./components";
import { EXIST_PAGE_PAGINATION } from "../../types/global.types";
import { Profile } from "../../components";

const Company = () => {
  const { addControlForCompany, addControlForCompanySales } =
    useCompanyControlButton();
  const [isChecked, setisChecked] = useState(false);
  const { scrapeCompanyData } = useCompanyScrape();
  const { checkCompanyExist } = useCompanyExist();
  const {
    uds_salesnavigatorcompanyurl,
    uds_linkedinprofilecompanyurl,
    name,
    setLoading,
    uds_linkedincompanyid,
    setResetCompany,
    setCompanyBackendData,
    setUserBackendData,
    companyPagination,
    companyImage,
    companyBackData,
    setResetCompanyError,
  } = useStore();
  useEffect(() => {
    scrapeCompanyData();
    setTimeout(() => {
      addControlForCompany();
      addControlForCompanySales();
      scrapeCompanyData();
    }, 2000);
    addControlForCompany();
    addControlForCompanySales();
  }, []);

  const CompanyPagination = () => {
    switch (companyPagination) {
      case EXIST_PAGE_PAGINATION.EXIST:
        return <ExistCompany />;
      case EXIST_PAGE_PAGINATION.SELECT:
        return <SelectCompany />;
      default:
        return <NotExistCompany />;
    }
  };

  useEffect(() => {
    setLoading(true);
    if (
      !isChecked &&
      (uds_salesnavigatorcompanyurl
        ? uds_salesnavigatorcompanyurl
        : uds_linkedinprofilecompanyurl) &&
      uds_linkedincompanyid
    ) {
      checkCompanyExist().then(() => {
        setLoading(false);
      });
      setisChecked(true);
    }
  }, [
    isChecked,
    uds_linkedinprofilecompanyurl,
    uds_linkedincompanyid,
    uds_salesnavigatorcompanyurl,
  ]);


  const handleReloadCompany = async () => {
    setResetCompanyError();
    setResetCompany()
    setCompanyBackendData(null)
    setUserBackendData(null)
    await scrapeCompanyData();
    await checkCompanyExist();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <div>
      {companyPagination !== EXIST_PAGE_PAGINATION.SELECT && (
        <Profile
          existText={companyBackData ? "Account already exists in the CRM" : "Account doesn’t exist in CRM"}
          name={name ? name : ""}
          image={
            companyImage?.includes("https://media.licdn.com")
              ? companyImage
              : "https://openseauserdata.com/files/a1439c13b366dd156de18328ca708f9f.png"
          }
          onClick={handleReloadCompany}
        />
      )}
      {CompanyPagination()}
    </div>
  );
};

export default Company;
