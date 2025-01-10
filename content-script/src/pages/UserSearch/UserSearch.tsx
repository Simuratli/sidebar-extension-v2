import React, { useEffect } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import { useStore } from "../../store";
import { UserSearchExist, UserSearchNotExist } from "./components";
import { Alert, Profile } from "../../components";
import { getDataverse } from "../../api";
import { fixUserLinkedinUrl } from "../../utils/fixUrl.util";
import { LINKEDIN_PAGE_ENUM, PAGE_ENUM } from "../../types/global.types";
import { useUserExist } from "../../hooks/useUserExist";
const UserSearch = () => {
  const { addForUserSearch, addForSalesUserSearch } = useUserSearchButton();
  const {
    userBackendData,
    fullname,
    userProfileImage,
    dataForReloadSearchingUser,
    setResetUser,
    setFullname,
    setResetUserError,
    setUserProfileImage,
    setJobTitle,
    setProfileBackground,
    setUserAdress,
    setUserLinkedin,
    jobtitle,
    userAddress1_name,
    uds_linkedin,
    setCompanyBackendData,
    setUserBackendData,
    setResetCompany,
    setCompanyName,
    setCustomer,
    setCustomerId,
    setPersonalEmail,
    setPersonalPhone,
    setDescription,
    webApiEndpoint,
    accessToken,
    setErrorText,
    setPage,
  } = useStore();

  useEffect(() => {
    addForUserSearch();
    addForSalesUserSearch();

    setTimeout(() => {
      addForUserSearch();
      addForSalesUserSearch();
    }, 2500);
  }, []);

  const { getCustomerWithId } = useUserExist();

  const handleProfileReload = async () => {
    const response = await getDataverse(`${webApiEndpoint}/contacts?$filter=contains(${window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES)? "uds_salesnavigatoruserurl" : "uds_linkedin"},'${fixUserLinkedinUrl(dataForReloadSearchingUser?.url?.replace(/\/$/, "") || "")}')`, accessToken,);

    if (response.error) {
      setPage(PAGE_ENUM.ERROR);
      const typedError = response.error as Error;
      setErrorText(typedError.message);
    } else {
      if (response.value.length > 0) {
        setUserBackendData(response.value[0]);
        await getCustomerWithId();
      } else {
        setUserBackendData(null);
        setCompanyBackendData(null);
        setCompanyName("");
      }
    }

    setTimeout(() => {
      setResetUser();
      setResetUserError();
      setResetCompany();
      setProfileBackground(null);
      setFullname(dataForReloadSearchingUser?.userName);
      setJobTitle(dataForReloadSearchingUser?.job);
      setUserAdress(dataForReloadSearchingUser?.location);
      setUserLinkedin(dataForReloadSearchingUser?.url || "");
      setCompanyBackendData(
        dataForReloadSearchingUser?.existedUsersCompanyData!,
      );
      setUserBackendData(dataForReloadSearchingUser?.existedData!);
      setCompanyName(dataForReloadSearchingUser?.currentCompany);
      setCustomer(dataForReloadSearchingUser?.currentCompany);
      setCustomerId(dataForReloadSearchingUser?.currentCompanyId);
      setPersonalEmail(dataForReloadSearchingUser?.email);
      setPersonalPhone(dataForReloadSearchingUser?.mobile);
      setDescription(dataForReloadSearchingUser?.summary);
    }, 200);
  };

  return (
    <section>
      <Profile
        name={fullname}
        existText={userBackendData ? "Contact already exists in the CRM" : "Contact doesn’t exist in CRM"}
        onClick={handleProfileReload}
        image={
          userProfileImage?.includes("https://media.licdn.com")
            ? userProfileImage
            : "https://openseauserdata.com/files/a1439c13b366dd156de18328ca708f9f.png"
        }
      />
      {userBackendData ? (
        <UserSearchExist />
      ) : fullname || uds_linkedin || jobtitle || userAddress1_name ? (
        <UserSearchNotExist />
      ) : (
        <Alert text="Please Select User" />
      )}
    </section>
  );
};

export default UserSearch;
