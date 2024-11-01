import React from "react";
import { Button } from "../../../components";
import { useStore } from "../../../store";
import { Table, Input, TextArea } from "../../../components";
import {
  APP_LOCATION,
  BUTTON_ENUM,
  INPUT_TYPES,
  TEXTAREA_ENUM,
} from "../../../types/global.types";
import { openInCrm } from "../../../utils/openCrm.util";
import { checkDifference } from "../../../utils/checkExistedInputDifference.util";
import { useCreateCompany } from "../../../hooks/useCreateCompany";
import { useCompanyValidation } from "../../../hooks/useCompanyValidation";
function ExistCompanySearch() {
  const {
    name,
    companyBackData,
    uds_linkedinprofilecompanyurl,
    uds_salesnavigatorcompanyurl,
    websiteurl,
    companySize,
    companyAddress1_name,
    companyDescription,
    numberofemployees,
    crmUrl,
    nameError,
    numberofemployeesError,
    companyAddress1_nameError,
    companySizeError,
    websiteurlError,
    companyDescriptionError,
    isCompanyHaveError,
  } = useStore();
  const { updateCurrentCompany, checkHaveDifferentValueForButton } =
    useCreateCompany();
  const { handleChange } = useCompanyValidation();
  return (
    <div>
      <div className="company__form">
        <Table>
          <tr
            className={
              uds_salesnavigatorcompanyurl
                ? checkDifference(
                    uds_salesnavigatorcompanyurl,
                    companyBackData?.uds_salesnavigatorcompanyurl,
                  )
                : checkDifference(
                    uds_linkedinprofilecompanyurl,
                    companyBackData?.uds_linkedinprofilecompanyurl,
                  )
            }
          >
            <td>Company profile link</td>
            <td>
              <TextArea
                type={TEXTAREA_ENUM.IN_TABLE}
                name="uds_linkedinprofilecompanyurl"
                readOnly
                placeholder="Company profile link"
                value={
                  uds_salesnavigatorcompanyurl
                    ? uds_salesnavigatorcompanyurl
                    : uds_linkedinprofilecompanyurl
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
                  uds_salesnavigatorcompanyurl
                    ? companyBackData?.uds_salesnavigatorcompanyurl
                    : companyBackData?.uds_linkedinprofilecompanyurl
                }
              />
            </td>
          </tr>

          <tr className={checkDifference(name, companyBackData?.name)}>
            <td>Company name</td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                placeholder="Company name"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                error={nameError}
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
              companyAddress1_name,
              companyBackData?.address1_name,
            )}
          >
            <td>Company address</td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                id="companyAddress1_name"
                name="companyAddress1_name"
                value={companyAddress1_name}
                placeholder="Company address"
                onChange={handleChange}
                error={companyAddress1_nameError}
              />
            </td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                value={companyBackData?.address1_name}
                readonly
              />
            </td>
          </tr>

          <tr
            className={checkDifference(
              Number(numberofemployees),
              companyBackData?.numberofemployees,
            )}
          >
            <td>Employees on Ln</td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                value={numberofemployees}
                id="numberofemployees"
                name="numberofemployees"
                placeholder="Employees on Ln"
                onChange={handleChange}
                error={numberofemployeesError}
              />
            </td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                value={companyBackData?.numberofemployees}
                readonly
              />
            </td>
          </tr>

          <tr
            className={checkDifference(
              websiteurl || "",
              companyBackData?.websiteurl || "",
            )}
          >
            <td>Website</td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                value={websiteurl ? websiteurl : ""}
                id="websiteurl"
                name="websiteurl"
                placeholder="Website"
                onChange={handleChange}
                error={websiteurlError}
              />
            </td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                readonly
                value={companyBackData?.websiteurl}
              />
            </td>
          </tr>

          <tr
            className={checkDifference(
              Number(companySize) || "",
              companyBackData?.uds_linkedinsize || "",
            )}
          >
            <td>Company size</td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                value={companySize}
                id="companySize"
                name="companySize"
                placeholder="Company size"
                onChange={handleChange}
                error={companySizeError}
              />
            </td>
            <td>
              <Input
                type={INPUT_TYPES.IN_TABLE}
                readonly
                value={companyBackData?.uds_linkedinsize}
              />
            </td>
          </tr>

          <tr
            className={checkDifference(
              companyDescription,
              companyBackData?.description ? companyBackData?.description : "",
            )}
          >
            <td>Comment</td>
            <td>
              <TextArea
                type={TEXTAREA_ENUM.IN_TABLE}
                name="companyDescription"
                placeholder="Comment"
                value={companyDescription}
                onChange={handleChange}
                error={companyDescriptionError}
              />
            </td>
            <td>
              <TextArea
                type={TEXTAREA_ENUM.IN_TABLE}
                name="companyComment"
                className="right"
                readOnly
                value={companyBackData?.description}
              />
            </td>
          </tr>
        </Table>
      </div>

      {/*  */}
      <div className="existCompanyFooter">
        <Button
          type={BUTTON_ENUM.BLUE}
          onClick={() => {
            openInCrm(
              crmUrl,
              APP_LOCATION.COMPANY,
              companyBackData?.accountid ? companyBackData?.accountid : "",
            );
          }}
          text="Go to CRM"
        />
        <Button
          type={BUTTON_ENUM.GOLD}
          disabled={!checkHaveDifferentValueForButton() || isCompanyHaveError}
          onClick={updateCurrentCompany}
          text="Update data"
        />
      </div>
    </div>
  );
}

export default ExistCompanySearch;
