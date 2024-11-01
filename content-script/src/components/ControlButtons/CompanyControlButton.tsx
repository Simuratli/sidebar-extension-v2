import React, { useState } from "react";
import { ControlIcon } from "../../assets";
import { CONTROL_ICONS_TYPE } from "../../types/global.types";
import { useControlButton } from "../../hooks/useControlButton";
const CompanyControlButton = () => {
  const [showMainInfoDetail, setShowMainInfoDetail] = useState(false);
  const { generateTypeOfControl, handleClickControl } = useControlButton();

  return (
    <div
      onMouseEnter={() => {
        setShowMainInfoDetail(true);
      }}
      onMouseLeave={() => {
        setShowMainInfoDetail(false);
      }}
      className="controlIcon__holder iconHolder"
    >
      <ControlIcon
        type={generateTypeOfControl()}
        onClick={handleClickControl}
      />
      {showMainInfoDetail && (
        <span className="iconHoverDetail iconHoverDetailUser">
          {generateTypeOfControl() !== CONTROL_ICONS_TYPE.LOGIN
            ? generateTypeOfControl() === CONTROL_ICONS_TYPE.CAPTURE_EXIST
              ? "Contact already exists in CRM."
              : "Capture Contact into CRM."
            : "Login to LinkedIn extension"}
        </span>
      )}
    </div>
  );
};

export default CompanyControlButton;
