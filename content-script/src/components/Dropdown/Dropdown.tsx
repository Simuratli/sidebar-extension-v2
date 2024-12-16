import React from "react";
import { DropdownIcon, CircleDropdownIcon } from "../../assets";
import { SmallLoader } from "..";
import "../../style/component/dropdown.scss";
import { DropdownPropTypes } from "./Dropdown.types";
import { DropdownElement } from "./DropdownComponents";
import { useStore } from "../../store";
import { useOpener } from "../../hooks/useOpener";
import { openInCrm } from "../../utils/openCrm.util";
import { useDropdown } from "../../hooks/useDropdown";
function Dropdown({
  withLabel = true,
  createNewData,
  dataForExistedElements,
  onViewMore,
  hideViewMore,
  location,
  onCreateNew,
  inOut,
  label,
  withSearch,
  onSearch,
  searchValue,
  loader,
  type,
  withRadioButton,
  error,
}: DropdownPropTypes) {
  const { open, setOpen, ref } = useOpener();
  const { handleClickEdit, goToCreateNew } = useDropdown(
    inOut,
    location,
    onCreateNew,
    setOpen,
    type,
  );

  const { crmUrl, companyBackData, setCompanyBackendData } = useStore();

  return (
    <div ref={ref} className={`extensiondropdown ${inOut} ${type}`}>
      {withLabel &&
        (withSearch ? (
          <div>
            <label
              htmlFor="extensiondropdown"
              className="extensiondropdown__header"
            >
              <input
                id="extensiondropdown"
                onFocus={() => {
                  setOpen(true);
                }}
                value={searchValue}
                onChange={onSearch}
                className={`extensiondropdown__header__label ${error && "error"}`}
                placeholder="Add Company"
              />
              <DropdownIcon />
            </label>
            <p className="form__control__error">{error}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className="extensiondropdown__header"
          >
            <span className="extensiondropdown__header__label">{label}</span>
            <DropdownIcon />
          </div>
        ))}
      <div
        className={`extensiondropdown__body ${open ? "open" : !withLabel ? "open" : ""}`}
      >
        <div className="extensiondropdown__elements">
          <div className="extensiondropdown__element">
            {createNewData.name && (
              <div className="extensiondropdown__element__container">
                <DropdownElement
                  elementId="create"
                  withRadioButton={withRadioButton}
                  onCreateNew={goToCreateNew}
                  createNew
                  {...createNewData}
                />
              </div>
            )}
          </div>
          {dataForExistedElements &&
            dataForExistedElements.map((data, index) => {
              return (
                <div key={index} className="extensiondropdown__element">
                  <DropdownElement
                    withRadioButton={withRadioButton}
                    onClickEdit={() => {
                      handleClickEdit(data.id);
                    }}
                    elementId={data.id}
                    onClickRedirect={() => {
                      openInCrm(crmUrl, location, data.id);
                    }}
                    {...data}
                  />
                </div>
              );
            })}

          {loader && <SmallLoader />}
        </div>

        {!hideViewMore && (
          <div className="extensiondropdown__footer">
            <button
              onClick={onViewMore}
              className="extensiondropdown__footer__button"
            >
              view more <CircleDropdownIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
