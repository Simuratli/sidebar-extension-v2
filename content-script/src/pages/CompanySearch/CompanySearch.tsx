import React, { useEffect } from "react";
import { useCompanyControlButton } from "../../hooks/useCompanyControlButton";
import { useStore } from "../../store";
import { ExistCompanySearch, NotExistCompanySearch } from "./components";
import { Profile } from "../../components";
import { getDataverse } from "../../api";
import { LINKEDIN_PAGE_ENUM, PAGE_ENUM } from "../../types/global.types";
import { SearchControlCompanyStateObject } from "../../store/searchControlCompany";
import { fixUserLinkedinUrl } from "../../utils/fixUrl.util";
import { fixUrlWithPathnameAndOrigin } from "../../utils/url.utils";

const CompanySearch = () => {
  const { addForCompanySearch, addForSalesCompanySearch } =
    useCompanyControlButton();
  const {
    companyBackData,
    webApiEndpoint,
    companyImage,
    name,
    accessToken,
    searchControlCompanyData,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    setCompanyName,
    setCompanyAdress,
    setCompanyDescription,
    setErrorText,
    setPage,
    setCompanyBackendData,
    setResetCompanyError,
    setResetCompany,
    setNumberOfEmployees,
    uds_linkedincompanyid,
    setLinkedinCompanyId
  } = useStore();
  useEffect(() => {
    addForCompanySearch();
    addForSalesCompanySearch();

    setTimeout(() => {
      addForCompanySearch();
      addForSalesCompanySearch();
    }, 2500);
  }, []);

  const handleProfileCompanyReload = async () => {
    setResetCompanyError();
    setResetCompany();


    let response: any = null;

    if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES)) {
      response = await getDataverse(`${webApiEndpoint}/accounts?$filter=contains(uds_linkedincompanyid,'${uds_linkedincompanyid}')`, accessToken);
    } else {
      response = await getDataverse(`${webApiEndpoint}/accounts?$filter=contains(uds_linkedinprofilecompanyurl,'${fixUrlWithPathnameAndOrigin(uds_linkedinprofilecompanyurl)}')`, accessToken);
    }



    if (response.error) {
      setPage(PAGE_ENUM.ERROR);
      const typedError = response.error as Error;
      setErrorText(typedError.message);
    } else {
      if (response.value.length > 0) {
        setCompanyBackendData(response.value[0]);
      } else {
        setCompanyBackendData(null);
      }
    }




    const companyData: SearchControlCompanyStateObject[] = searchControlCompanyData.filter((data) => uds_linkedinprofilecompanyurl ? data.url === uds_linkedinprofilecompanyurl : data.url === uds_salesnavigatorcompanyurl)


    if (companyData.length > 0) {
      let data = companyData[0]
      setCompanyName(data.companyName);
      setCompanyAdress(data.location);
      setCompanyDescription(data.description || null);
      setNumberOfEmployees(data.numberOfEmployees!),
      setLinkedinCompanyId(data.companyId)
    }

  };


  return (
    <div>
      <Profile
      existText={companyBackData ? "Account already exists in the CRM" : "Account doesn’t exist in CRM"}
        name={name || ""}
        onClick={handleProfileCompanyReload}
        image={
          companyImage?.includes("https://media.licdn.com")
            ? companyImage
            : "https://openseauserdata.com/files/a1439c13b366dd156de18328ca708f9f.png"
        }
      />

      {companyBackData ? <ExistCompanySearch /> : <NotExistCompanySearch />}
    </div>
  );
};

export default CompanySearch;
