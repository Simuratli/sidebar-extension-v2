import React from "react";
import { InfoBigIcon } from "../../../assets";
import { Dropdown } from "../../../components";
import "../../../style/content/selectCompany.scss";
import { useStore } from "../../../store";
import {
  createArrayForNewFieldCompany,
  createDataForExistedNamesCompany,
} from "../../../utils/selectCompanyUtils";
import { useCompanyExist } from "../../../hooks/useCompanyExist";
import { useState, useMemo } from "react";
import { APP_LOCATION, IN_OUT } from "../../../types/global.types";
function SelectCompany() {
  const {
    name,
    websiteurl,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    companyAddress1_name,
    companyBackDataWithNames,
    uds_linkedincompanyid,
    setLoading,
  } = useStore();
  const { getCompaniesWithNames } = useCompanyExist();
  const [num, setNum] = useState(5);

  useMemo(async () => {
    if (num !== 5) {
      setLoading(true);
      await getCompaniesWithNames(num);
      setLoading(false);
    }
  }, [num]);

  return (
    <div className="selectCompany">
      <div className="selectCompany__icon">
        <InfoBigIcon />
      </div>
      <h1 className="selectCompany__title">
        We found account(s) with the same name in the CRM. <br /> Choose further
        actions.
      </h1>
      <Dropdown
        inOut={IN_OUT.OUTER}
        location={APP_LOCATION.COMPANY}
        createNewData={{
          name: name ? name : "",
          id: uds_linkedincompanyid ? uds_linkedincompanyid : "",
          data: createArrayForNewFieldCompany(
            companyAddress1_name,
            websiteurl,
            uds_linkedinprofilecompanyurl,
            uds_salesnavigatorcompanyurl,
          ),
        }}
        withLabel={false}
        dataForExistedElements={createDataForExistedNamesCompany(
          companyBackDataWithNames,
        )}
        onViewMore={async () => {
          setNum((prev) => prev + 5);
        }}
        hideViewMore={
          companyBackDataWithNames?.length
            ? companyBackDataWithNames?.length < num
            : false
        }
      />
    </div>
  );
}

export default SelectCompany;
