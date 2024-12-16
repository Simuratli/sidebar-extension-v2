import React, { useEffect, useState, useRef } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import useUserScrape from "../../hooks/useUserScrape";
import { useStore } from "../../store";
import { Loader, Profile } from "../../components";
import { useUserExist } from "../../hooks/useUserExist";
import {
  EXIST_PAGE_PAGINATION,
  LINKEDIN_PAGE_ENUM,
} from "../../types/global.types";
import { dateToNormalDateString } from "../../utils/time.utils";

const User = () => {
  const hasRun = useRef(false);
  const { addControlForUser, addControlForUserSales } = useUserSearchButton();
  const { scrapeUserData } = useUserScrape();
  const { checkUserExist, generateUserScrapePage } = useUserExist();
  const {
    fullname,
    userProfileImage,
    uds_salesnavigatoruserurl,
    uds_linkedin,
    setLoading,
    setResetUserError,
    sidebarOpen,
    setPersonalEmail,
    accessToken,
    userPagination,
    profileBackground,
    setPersonalPhone,
    setBirthday,
    customer,
    setCustomer,
    setCustomerId,
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
    console.log(profileBackground, "profileBackground");
    if (sidebarOpen && accessToken) {
      if (profileBackground) {
        if (profileBackground.MOBILE) {
          setPersonalPhone(profileBackground.MOBILE);
        }
        if (profileBackground.company) setCustomer(profileBackground.company);
        if (profileBackground.companyId)
          setCustomerId(profileBackground.companyId);

        if (profileBackground.email) {
          setPersonalEmail(profileBackground.email);
        }
        if (profileBackground.birthDate) {
          setBirthday(dateToNormalDateString(profileBackground.birthDate));
        }
      }

      setTimeout(() => {
        scrapeUserData();
        setTimeout(() => {
          scrapeUserData();
        }, 500);
      }, 1000);
    }
  }, [sidebarOpen, accessToken, profileBackground]);

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
    await checkUserExist();
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
