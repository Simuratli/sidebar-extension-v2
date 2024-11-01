import React from "react";
import { Button, Input, TextArea } from "../../../components";
import { useStore } from "../../../store";
import {
  BUTTON_ENUM,
  INPUT_TYPES,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { InfoIcon, SuccessIcon } from "../../../assets";
import "../../../style/content/company.scss";
import { useNoExistUser } from "../../../hooks/useNoExistUser";
import { useSaveUser } from "../../../hooks/useSaveUser";

const UserSearchNotExist = () => {
  const {
    fullname,
    uds_linkedin,
    uds_salesnavigatoruserurl,
    setFullname,
    fullnameError,
    jobtitle,
    jobtitleError,
    setJobTitle,
    userAddress1_name,
    userAddress1_nameError,
    setUserAdress,
    description,
    descriptionError,
    isUserHaveError,
  } = useStore();

  const { handleClickOpenUser, isCreated, handleClickSaveButtonUser } =
    useSaveUser();

  const { handleChange, handlePaste } = useNoExistUser();

  return (
    <div>
      <div>
        <div className="company__form">
          <div className="company__form__inputs">
            <Input
              id="uds_linkedin"
              type={INPUT_TYPES.WITH_LABEL}
              name="uds_linkedinprofilecompanyurl"
              placeholder="User profile link"
              value={uds_linkedin ? uds_linkedin : uds_salesnavigatoruserurl}
              readonly
              required
            />

            <Input
              id="fullname"
              type={INPUT_TYPES.WITH_LABEL}
              name="fullname"
              onChange={handleChange}
              placeholder="Full name"
              value={fullname}
              onClear={() => {
                setFullname("");
              }}
              error={fullnameError}
              required
              onPaste={async (e) => {
                handlePaste(e ? e : fullname, "fullname");
              }}
            />
            <Input
              id="jobtitle"
              type={INPUT_TYPES.WITH_LABEL}
              name="jobtitle"
              onChange={handleChange}
              placeholder="Job title"
              value={jobtitle ? jobtitle : ""}
              onClear={() => {
                setJobTitle("");
              }}
              onPaste={async (e) => {
                handlePaste(e ? e : jobtitle, "jobtitle");
              }}
              error={jobtitleError}
            />

            <Input
              id="userAddress1_name"
              type={INPUT_TYPES.WITH_LABEL}
              name="userAddress1_name"
              onChange={handleChange}
              placeholder="Adress"
              value={userAddress1_name ? userAddress1_name : ""}
              onClear={() => {
                setUserAdress("");
              }}
              onPaste={async (e) => {
                handlePaste(e ? e : userAddress1_name, "userAddress1_name");
              }}
              error={userAddress1_nameError}
            />
          </div>
          <TextArea
            type={TEXTAREA_ENUM.NORMAL}
            onChange={handleChange}
            value={description}
            name="description"
            placeholder="Add comment"
            error={descriptionError}
          />
        </div>
        <div className="company__footer">
          <div className="company__footer__text">
            <InfoIcon />
            <p>You can complete the empty fields yourself</p>
          </div>
          <div className="company__footer__buttonContainer">
            {isCreated ? (
              <>
                <p className="company__footer__success">
                  <SuccessIcon />
                  Success!
                </p>
                <Button
                  className="company__captureButton"
                  onClick={handleClickOpenUser}
                  text="Go to CRM"
                  type={BUTTON_ENUM.GOLD}
                />
              </>
            ) : (
              <>
                <Button
                  className="company__captureButton"
                  onClick={() => {
                    handleClickSaveButtonUser("POST");
                  }}
                  text="Capture"
                  type={BUTTON_ENUM.GOLD}
                  disabled={isUserHaveError}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchNotExist;
