import React, { useEffect, useState, useRef } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import useUserScrape from "../../hooks/useUserScrape";
import { useStore } from "../../store";
import { Loader, Profile } from "../../components";
import { useUserExist } from "../../hooks/useUserExist";
import { EXIST_PAGE_PAGINATION } from "../../types/global.types";
import { useSaveUser } from "../../hooks/useSaveUser";

const User = () => {
  const { addControlForUser, addControlForUserSales } = useUserSearchButton();
  const { scrapeUserData, saveUserDetailsInLinkedinUser } = useUserScrape();
  const { checkUserExist, generateUserScrapePage } = useUserExist();
  const { setIsCreated } = useSaveUser();
  const {
    fullname,
    userBackendData,
    userProfileImage,
    uds_salesnavigatoruserurl,
    uds_linkedin,
    setLoading,
    setResetUserError,
    sidebarOpen,
    accessToken,
    setUserBackendData,
    userPagination,
    setCompanyBackendData,
    profileBackground,
    customer,
  } = useStore();
  const [isChecked, setisChecked] = useState(false);

  useEffect(() => {
    scrapeUserData();
    setTimeout(() => {
      addControlForUser();
      addControlForUserSales();
      scrapeUserData();
    }, 2000);
    addControlForUser();
    addControlForUserSales();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (sidebarOpen && accessToken) {
      if (!fullname && fullname === "") {
        saveUserDetailsInLinkedinUser(profileBackground);
      }
      setTimeout(() => {
        scrapeUserData();
        setTimeout(() => {
          scrapeUserData();
        }, 500);
      }, 1000);
      setLoading(false);
    }
  }, [sidebarOpen, accessToken, profileBackground, fullname]);

  useEffect(() => {
    const fetchUserExist = async () => {
      if (
        !isChecked &&
        (uds_salesnavigatoruserurl || uds_linkedin) &&
        fullname
      ) {
        await checkUserExist(); // Ensure this finishes
        setisChecked(true);
      }
    };
    fetchUserExist();
    setLoading(false);
  }, [isChecked, uds_linkedin, fullname, customer, uds_salesnavigatoruserurl]);

  const handleReloadUser = async () => {
    setLoading(true);
    setIsCreated(false);
    setUserBackendData(null);
    setCompanyBackendData(null);

    await checkUserExist();
    saveUserDetailsInLinkedinUser(profileBackground);
    await scrapeUserData();
    setResetUserError();
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <div>
      {userPagination !== EXIST_PAGE_PAGINATION.SELECT && (
        <Profile
          name={fullname}
          existText={userBackendData ? "Contact already exists in the CRM" : "Contact doesn’t exist in CRM"}
          onClick={handleReloadUser}
          image={
            userProfileImage?.includes("https://media.licdn.com")
              ? userProfileImage
              : "https://openseauserdata.com/files/a1439c13b366dd156de18328ca708f9f.png"
          }
        />
      )}

      <div
        className={
          userPagination !== EXIST_PAGE_PAGINATION.SELECT ? "company__form" : ""
        }
      >
        {!userPagination ? <Loader /> : generateUserScrapePage()}
      </div>
    </div>
  );
};

export default User;
