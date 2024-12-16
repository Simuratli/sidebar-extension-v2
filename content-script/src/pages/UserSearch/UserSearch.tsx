import React, { useEffect } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import { useStore } from "../../store";
import { UserSearchExist, UserSearchNotExist } from "./components";
import { Alert, Profile } from "../../components";
const UserSearch = () => {
  const { addForUserSearch, addForSalesUserSearch } = useUserSearchButton();
  const {
    userBackendData,
    fullname,
    userProfileImage,
    dataForReloadSearchingUser,
    setResetUser,
    setFullname,
    setUserProfileImage,
    setJobTitle,
    setProfileBackground,
    setUserAdress,
    setUserLinkedin,
    jobtitle,
    userAddress1_name,
    uds_linkedin,
  } = useStore();

  useEffect(() => {
    addForUserSearch();
    addForSalesUserSearch();

    setTimeout(() => {
      addForUserSearch();
      addForSalesUserSearch();
    }, 2500);
  }, []);

  const handleProfileReload = () => {
    setResetUser();
    setProfileBackground(null);
    setFullname(dataForReloadSearchingUser?.userName);
    setUserProfileImage(dataForReloadSearchingUser?.id);
    setJobTitle(dataForReloadSearchingUser?.job);
    setUserAdress(dataForReloadSearchingUser?.location);
    setUserLinkedin(dataForReloadSearchingUser?.url || "");
  };

  return (
    <section>
      <Profile
        name={fullname}
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
