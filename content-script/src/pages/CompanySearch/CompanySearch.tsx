import React, { useEffect } from "react";
import { useCompanyControlButton } from "../../hooks/useCompanyControlButton";
import { useStore } from "../../store";
import { ExistCompanySearch, NotExistCompanySearch } from "./components";
import { Profile } from "../../components";

const CompanySearch = () => {
  const { addForCompanySearch, addForSalesCompanySearch } =
    useCompanyControlButton();
  const {
    companyBackData,
    companyImage,
    name,
    searchControlCompanyData,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    setCompanyName,
    setCompanyAdress,
    setCompanyDescription,
  } = useStore();
  useEffect(() => {
    addForCompanySearch();
    addForSalesCompanySearch();

    setTimeout(() => {
      addForCompanySearch();
      addForSalesCompanySearch();
    }, 2500);
  }, []);

  const handleProfileCompanyReload = () => {
    searchControlCompanyData.map((companyData) => {
      if (
        uds_linkedinprofilecompanyurl
          ? companyData.url === uds_linkedinprofilecompanyurl
          : companyData.url === uds_salesnavigatorcompanyurl
      ) {
        setCompanyName(companyData.companyName);
        setCompanyAdress(companyData.location);
        setCompanyDescription(companyData.description || null);
      }
    });
  };

  return (
    <div>
      <Profile
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
