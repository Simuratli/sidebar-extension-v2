import React from "react";
import { Table, TextArea, Input, Dropdown, Button } from "../../../components";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  INPUT_TYPES,
  IN_OUT,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { useStore } from "../../../store";
import { checkDifference } from "../../../utils/checkExistedInputDifference.util";
import { createDataForExistedNamesCompany } from "../../../utils/selectCompanyUtils";
import { openInCrm } from "../../../utils/openCrm.util";
import { useExistUser } from "../../../hooks/useExistUser";
import { useNoExistUser } from "../../../hooks/useNoExistUser";
import { useSaveUser } from "../../../hooks/useSaveUser";

function ExistSearchUser() {
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
    customer,
    setCompanyName,
    setLinkedinCompanyId,
    name,
    customerId,
    companyBackDataWithNames,
    crmUrl,
    setAccountid,
    fullnameError,
    jobtitleError,
    telephone1Error,
    descriptionError,
    mobilephoneError,
    emailaddress2Error,
    emailaddress1Error,
    userAddress1_nameError,
    isUserHaveError,
  } = useStore();

  const {
    checkHaveDifferentValueForButton,
    handleSearch,
    showLoaderForDropdown,
    customerError,
  } = useExistUser();
  const { handleChange } = useNoExistUser();

  const { handleClickOpenUser, handleClickSaveButtonUser } = useSaveUser();

  return (
    <>
      <Table>
        <tr
          className={
            uds_salesnavigatoruserurl
              ? checkDifference(
                  uds_salesnavigatoruserurl,
                  userBackendData?.uds_salesnavigatoruserurl,
                )
              : checkDifference(uds_linkedin, userBackendData?.uds_linkedin)
          }
        >
          <td>Profile link</td>
          <td>
            <TextArea
              type={TEXTAREA_ENUM.IN_TABLE}
              name="companyProfileLink"
              readOnly
              placeholder="Profile link"
              value={
                uds_salesnavigatoruserurl
                  ? uds_salesnavigatoruserurl
                  : uds_linkedin
              }
            />
          </td>
          <td>
            <TextArea
              type={TEXTAREA_ENUM.IN_TABLE}
              name="companyProfileLink"
              readOnly
              className="right"
              value={
                userBackendData?.uds_salesnavigatoruserurl
                  ? userBackendData?.uds_salesnavigatoruserurl
                  : userBackendData?.uds_linkedin
              }
            />
          </td>
        </tr>

        <tr className={checkDifference(fullname, userBackendData?.fullname)}>
          <td>Name</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              placeholder="Name"
              id="fullname"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              error={fullnameError}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.fullname}
              readonly
            />
          </td>
        </tr>

        <tr className={checkDifference(jobtitle, userBackendData?.jobtitle)}>
          <td>Job title</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              id="jobtitle"
              error={jobtitleError}
              value={jobtitle}
              name="jobtitle"
              placeholder="Job title"
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.jobtitle}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            userAddress1_name,
            userBackendData?.address1_name,
          )}
        >
          <td>Address</td>
          <td>
            <Input
              id="userAddress1_name"
              type={INPUT_TYPES.IN_TABLE}
              error={userAddress1_nameError}
              value={userAddress1_name}
              name="userAddress1_name"
              placeholder="Address"
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.address1_name}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(name || "", companyBackData?.name || "")}
        >
          <td>Company</td>
          <td>
            <Dropdown
              withRadioButton
              withSearch
              loader={showLoaderForDropdown}
              onSearch={handleSearch}
              error={customerError}
              searchValue={name}
              onCreateNew={() => {
                setCompanyName(customer.trim());
                setLinkedinCompanyId(customerId);
                setAccountid(null);
              }}
              label={name ? name : "Add company"}
              inOut={IN_OUT.INNER}
              location={APP_LOCATION.USER}
              createNewData={{
                name: customer ? customer : "",
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
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={companyBackData?.name}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            telephone1 || "",
            userBackendData?.telephone1 || "",
          )}
        >
          <td>Work phone</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={telephone1}
              name="telephone1"
              id="telephone1"
              error={telephone1Error}
              placeholder="Work phone"
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.telephone1}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            mobilephone || "",
            userBackendData?.mobilephone || "",
          )}
        >
          <td>Personal phone</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              name="mobilephone"
              id="mobilephone"
              error={mobilephoneError}
              value={mobilephone}
              placeholder="Personal phone"
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.mobilephone}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            emailaddress2 || "",
            userBackendData?.emailaddress2 || "",
          )}
        >
          <td>Email</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={emailaddress2}
              name="emailaddress2"
              id="emailaddress2"
              error={emailaddress2Error}
              placeholder="Email"
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.emailaddress2}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            emailaddress1 || "",
            userBackendData?.emailaddress1 || "",
          )}
        >
          <td>Personal email</td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={emailaddress1}
              placeholder="Personal email"
              name="emailaddress1"
              id="emailaddress1"
              error={emailaddress1Error}
              onChange={handleChange}
            />
          </td>
          <td>
            <Input
              type={INPUT_TYPES.IN_TABLE}
              value={userBackendData?.emailaddress1}
              readonly
            />
          </td>
        </tr>

        <tr
          className={checkDifference(
            description || "",
            userBackendData?.description ? userBackendData?.description : "",
          )}
        >
          <td>Comment</td>
          <td>
            <TextArea
              type={TEXTAREA_ENUM.IN_TABLE}
              name="description"
              placeholder="Comment"
              value={description}
              error={descriptionError}
              onChange={handleChange}
            />
          </td>
          <td>
            <TextArea
              type={TEXTAREA_ENUM.IN_TABLE}
              name="description"
              className="right"
              readOnly
              value={userBackendData?.description}
            />
          </td>
        </tr>
      </Table>
      <div className="existCompanyFooter">
        <Button
          type={BUTTON_ENUM.BLUE}
          onClick={handleClickOpenUser}
          text="Go to CRM"
        />
        <Button
          type={BUTTON_ENUM.GOLD}
          disabled={!checkHaveDifferentValueForButton() || isUserHaveError}
          onClick={() => {
            handleClickSaveButtonUser("PATCH");
          }}
          text="Update data"
        />
      </div>
    </>
  );
}

export default ExistSearchUser;
