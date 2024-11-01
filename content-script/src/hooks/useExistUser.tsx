import { useState } from "react";
import { useStore } from "../store";
import { getDataverse } from "../api";
import { checkDifferenceTrueFalse } from "../utils/checkExistedInputDifference.util";

export function useExistUser() {
  const {
    uds_linkedin,
    uds_salesnavigatoruserurl,
    userBackendData,
    fullname,
    userAddress1_name,
    jobtitle,
    companyBackData,
    mobilephone,
    telephone1,
    emailaddress1,
    emailaddress2,
    description,
    setCompanyName,
    name,
    webApiEndpoint,
    accessToken,
    setCompanyBackendDataWithNames,
    setCompanyBackendData,
    setCompanyBackendDataForSelect,
  } = useStore();

  const [showLoaderForDropdown, setShowLoaderForDropdown] = useState(false);
  const [customerError, setCustomerError] = useState<string | null>(null);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 160) {
      setCustomerError("Character limit: 160");
    } else {
      setCustomerError(null);
    }
    setShowLoaderForDropdown(true);
    setCompanyName(value);
    // setCompanyBackendData(null)
    setCompanyBackendDataForSelect(null);
    const query = `contains(name,'${value}')`;
    const encodedQuery = encodeURIComponent(query);
    const response = await getDataverse(
      `${webApiEndpoint}/accounts?$filter=${encodedQuery}`,
      accessToken,
    );
    setCompanyBackendDataWithNames(response.value);
    setShowLoaderForDropdown(false);
  };

  const checkHaveDifferentValueForButton = () => {
    const urlChecker = uds_salesnavigatoruserurl
      ? checkDifferenceTrueFalse(
          uds_salesnavigatoruserurl,
          userBackendData?.uds_salesnavigatoruserurl,
        )
      : checkDifferenceTrueFalse(uds_linkedin, userBackendData?.uds_linkedin);

    return (
      urlChecker ||
      checkDifferenceTrueFalse(
        fullname || "",
        userBackendData?.fullname || "",
      ) ||
      checkDifferenceTrueFalse(name || "", companyBackData?.name || "") ||
      checkDifferenceTrueFalse(
        jobtitle || "",
        userBackendData?.jobtitle || "",
      ) ||
      checkDifferenceTrueFalse(
        userAddress1_name || "",
        userBackendData?.address1_name || "",
      ) ||
      checkDifferenceTrueFalse(
        mobilephone || "",
        userBackendData?.mobilephone || "",
      ) ||
      checkDifferenceTrueFalse(
        telephone1 || "",
        userBackendData?.telephone1 || "",
      ) ||
      checkDifferenceTrueFalse(
        emailaddress1 || "",
        userBackendData?.emailaddress1 || "",
      ) ||
      checkDifferenceTrueFalse(
        emailaddress2 || "",
        userBackendData?.emailaddress2 || "",
      ) ||
      checkDifferenceTrueFalse(
        description || "",
        userBackendData?.description || "",
      )
    );
  };

  return {
    checkHaveDifferentValueForButton,
    handleSearch,
    showLoaderForDropdown,
    customerError,
  };
}
