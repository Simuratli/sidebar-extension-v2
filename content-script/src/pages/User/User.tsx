import React, { useEffect, useState } from "react";
import { useUserSearchButton } from "../../hooks/useUserSearchButton";
import useUserScrape from "../../hooks/useUserScrape";
import { useStore } from "../../store";
import { Profile } from "../../components";
import { useUserExist } from "../../hooks/useUserExist";
import {
  EXIST_PAGE_PAGINATION,
  LINKEDIN_PAGE_ENUM,
} from "../../types/global.types";

const User = () => {
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
    accessToken,
    userPagination,
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
    if (sidebarOpen && accessToken) {
      if (window.location.href.includes(LINKEDIN_PAGE_ENUM.USER)) {
        const linkOfContactInfo = document.querySelector(
          "#top-card-text-details-contact-info",
        ) as HTMLElement;
        linkOfContactInfo.click();
      }

      setTimeout(() => {
        scrapeUserData();
        setTimeout(() => {
          scrapeUserData();
          const overlay = document
            .querySelector(".artdeco-modal-overlay")
            ?.querySelector(".artdeco-button") as HTMLElement;
          if (overlay) {
            overlay.click();
          }
          // window.history.back();
        }, 500);
      }, 1000);
    }
  }, [sidebarOpen, accessToken]);

  useEffect(() => {
    if (
      !isChecked &&
      (uds_salesnavigatoruserurl ? uds_salesnavigatoruserurl : uds_linkedin) &&
      fullname
    ) {
      checkUserExist().then(() => {
        setLoading(false);
      });
      setisChecked(true);
    }
  }, [isChecked, uds_linkedin, fullname]);

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
        {generateUserScrapePage()}
      </div>
    </div>
  );
};

export default User;
