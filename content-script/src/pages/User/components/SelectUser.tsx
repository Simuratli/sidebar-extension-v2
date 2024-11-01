import React from "react";
import { InfoBigIcon } from "../../../assets";
import { Dropdown } from "../../../components";
import "../../../style/content/selectCompany.scss";
import { useStore } from "../../../store";
import {
  createArrayForNewFieldCompany,
  createDataForExistedNamesUser,
} from "../../../utils/selectCompanyUtils";
import { useState, useMemo } from "react";
import { APP_LOCATION, IN_OUT } from "../../../types/global.types";
import { useUserExist } from "../../../hooks/useUserExist";
// import { useUserScrape } from "../../../hook/useUserScrape";
function SelectUser() {
  const {
    fullname,
    telephone1,
    emailaddress1,
    mobilephone,
    jobtitle,
    userBackendDataWithNames,
    setLoading,
  } = useStore();
  const { getUsersWithNames } = useUserExist();
  const [num, setNum] = useState(5);

  useMemo(async () => {
    if (num !== 5) {
      setLoading(true);
      await getUsersWithNames(num);
      setLoading(false);
    }
  }, [num]);

  return (
    <div className="selectCompany">
      <div className="selectCompany__icon">
        <InfoBigIcon />
      </div>
      <h1 className="selectCompany__title">
        We found contact(s) with the same name in the CRM. <br /> Choose further
        actions.
      </h1>
      <Dropdown
        inOut={IN_OUT.OUTER}
        location={APP_LOCATION.USER}
        createNewData={{
          name: fullname ? fullname : "",
          id: "",
          data: createArrayForNewFieldCompany(
            jobtitle,
            telephone1,
            emailaddress1,
            mobilephone,
          ),
        }}
        withLabel={false}
        dataForExistedElements={createDataForExistedNamesUser(
          userBackendDataWithNames,
        )}
        onViewMore={async () => {
          setNum((prev) => prev + 5);
        }}
        hideViewMore={
          userBackendDataWithNames?.length
            ? userBackendDataWithNames?.length < num
            : false
        }
      />
    </div>
  );
}

export default SelectUser;
