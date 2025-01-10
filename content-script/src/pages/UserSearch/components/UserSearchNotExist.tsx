import React from "react";
import { Button, Dropdown, Input, TextArea } from "../../../components";
import { useStore } from "../../../store";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  DROPDOWN_TYPE,
  IN_OUT,
  INPUT_TYPES,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { InfoIcon, SuccessIcon } from "../../../assets";
import "../../../style/content/company.scss";
import { useNoExistUser } from "../../../hooks/useNoExistUser";
import { useSaveUser } from "../../../hooks/useSaveUser";
import { useExistUser } from "../../../hooks/useExistUser";
import { createDataForExistedNamesCompany } from "../../../utils/selectCompanyUtils";

const UserSearchNotExist = () => {
  const {
    uds_linkedin,
    uds_salesnavigatoruserurl,
    customer,
    fullname,
    setFullname,
    telephone1,
    setWorkPhone,
    birthday,
    setBirthday,
    mobilephone,
    setPersonalPhone,
    jobtitle,
    setJobTitle,
    emailaddress1,
    setEmail,
    setUserAdress,
    userAddress1_name,
    emailaddress2,
    setPersonalEmail,
    description,
    customerId,
    name,
    setCompanyName,
    setLinkedinCompanyId,
    companyBackDataWithNames,
    setAccountid,
    crmUrl,
    fullnameError,
    birthdayError,
    descriptionError,
    emailaddress1Error,
    emailaddress2Error,
    telephone1Error,
    jobtitleError,
    mobilephoneError,
    isUserHaveError,
    userAddress1_nameError,
  } = useStore();
  const { handleSearch, showLoaderForDropdown } = useExistUser();
  const { handleClickOpenUser, isCreated, handleClickSaveButtonUser } =
    useSaveUser();

  const { handleChange, handlePaste } = useNoExistUser();

  return (
    <>
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

          {/* work dropdowon */}

          <Dropdown
            withRadioButton
            type={DROPDOWN_TYPE.SINGLE}
            withSearch
            loader={showLoaderForDropdown}
            onSearch={handleSearch}
            searchValue={name}
            onCreateNew={() => {
              setCompanyName(customer);
              setLinkedinCompanyId(customerId);
              setAccountid(null);
            }}
            label={name ? name : "Add company"}
            inOut={IN_OUT.INNER}
            location={APP_LOCATION.USER}
            createNewData={{
              name: customer ? customer : "Create New",
              id: customerId ? customerId : "",
              data: [],
            }}
            withLabel={true}
            dataForExistedElements={
              createDataForExistedNamesCompany(companyBackDataWithNames) || []
            }
            onViewMore={() => {}}
            hideViewMore={true}
          />

          {/* work dropdowon end */}
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
            id="telephone1"
            type={INPUT_TYPES.WITH_LABEL}
            name="telephone1"
            onChange={handleChange}
            placeholder="Work phone"
            value={telephone1}
            onClear={() => {
              setWorkPhone("");
            }}
            error={telephone1Error}
            onPaste={async (e) => {
              handlePaste(e ? e : telephone1, "telephone1");
            }}
          />
          <Input
            id="birthday"
            type={INPUT_TYPES.WITH_LABEL}
            name="birthday"
            onChange={handleChange}
            placeholder="Birthday"
            value={birthday}
            onClear={() => {
              setBirthday("");
            }}
            onPaste={async (e) => {
              !isNaN(Number(e)) && handlePaste(e ? e : birthday, "birthday");
            }}
            error={birthdayError}
          />
          <Input
            id="mobilephone"
            type={INPUT_TYPES.WITH_LABEL}
            name="mobilephone"
            onChange={handleChange}
            placeholder="Personal phone"
            value={mobilephone ? mobilephone : ""}
            onClear={() => {
              setPersonalPhone("");
            }}
            onPaste={async (e) => {
              handlePaste(e ? e : mobilephone, "mobilephone");
            }}
            error={mobilephoneError}
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
            id="emailaddress2"
            type={INPUT_TYPES.WITH_LABEL}
            name="emailaddress2"
            onChange={handleChange}
            placeholder="Email"
            value={emailaddress2 ? emailaddress2 : ""}
            onClear={() => {
              setPersonalEmail("");
            }}
            onPaste={async (e) => {
              handlePaste(e ? e : emailaddress2, "emailaddress2");
            }}
            error={emailaddress2Error}
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

          <Input
            id="emailaddress1"
            type={INPUT_TYPES.WITH_LABEL}
            name="emailaddress1"
            onChange={handleChange}
            placeholder="Personal email"
            value={emailaddress1 ? emailaddress1 : ""}
            onClear={() => {
              setEmail("");
            }}
            onPaste={async (e) => {
              handlePaste(e ? e : emailaddress1, "emailaddress1");
            }}
            error={emailaddress1Error}
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
    </>
  );
};

export default UserSearchNotExist;
