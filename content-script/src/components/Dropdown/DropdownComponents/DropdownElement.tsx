import {
  OrangePlusIcon,
  DropdownIcon,
  LinkIcon,
  EditIcon,
} from "../../../assets";
import { useState } from "react";
import "../../../style/component/dropdownElement.scss";
import { DropdownElementPropTypes } from "../Dropdown.types";
import { Radio } from "../..";
import { useStore } from "../../../store";

function DropdownElement({
  createNew,
  data,
  name,
  onClickEdit,
  onClickRedirect,
  onCreateNew,
  withRadioButton,
  elementId,
}: DropdownElementPropTypes) {
  const [open, setOpen] = useState(false);
  const { accountid } = useStore();
  return (
    <div className="dropdownElement">
      {withRadioButton && (
        <Radio
          onClick={createNew ? onCreateNew : onClickEdit}
          checked={createNew ? !accountid : accountid === elementId}
          id={elementId}
        />
      )}
      <div className="dropdownElement__container">
        <div className="dropdownElement__header">
          <h1>{name}</h1>
          <div className="dropdownElement__header__actions">
            {createNew ? (
              <>
                <span className="dropdownElement__badge">
                  Create new contact in CRM
                </span>
                <button onClick={onCreateNew}>
                  <OrangePlusIcon />
                </button>
              </>
            ) : (
              <>
                {!withRadioButton && (
                  <button
                    onClick={onClickEdit}
                    className="dropdownElement__header__actions__button"
                  >
                    <EditIcon />
                  </button>
                )}
                <button
                  onClick={onClickRedirect}
                  className="dropdownElement__header__actions__button strokeOnly"
                >
                  <LinkIcon />
                </button>
              </>
            )}
          </div>
        </div>
        {data.length !== 0 && (
          <div
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={`dropdownElement__body ${open && "open"}`}
          >
            <DropdownIcon />
            {data.map((item, index) => {
              return (
                <div key={index} className="dropdownElement__body__element">
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownElement;
