import React from "react";
import { CONTROL_ICONS_TYPE } from "../types/global.types";
import {
  ControlCaptureExistIcon,
  ControlCaptureNotExistIcon,
  ControlLoginIcon,
  ControlQuickFetchIcon,
  ControlRedirectIcon,
} from "../assets";
function control({
  type,
  onClick,
  ifExistInSearch,
}: {
  type: CONTROL_ICONS_TYPE;
  onClick: () => void;
  ifExistInSearch?: null | { value: [] };
}) {
  switch (type) {
    case CONTROL_ICONS_TYPE.CAPTURE_EXIST:
      return (
        <span onClick={onClick}>
          <ControlCaptureExistIcon />
        </span>
      );
    case CONTROL_ICONS_TYPE.CAPTURE_NOEXIST:
      return (
        <span onClick={onClick}>
          <ControlCaptureNotExistIcon />
        </span>
      );
    case CONTROL_ICONS_TYPE.LOGIN:
      return (
        <span onClick={onClick}>
          <ControlLoginIcon />
        </span>
      );
    case CONTROL_ICONS_TYPE.QUICK:
      return (
        <span onClick={onClick}>
          <ControlQuickFetchIcon />
        </span>
      );
    case CONTROL_ICONS_TYPE.REDIRECT:
      return (
        <span onClick={onClick}>
          <ControlRedirectIcon />
        </span>
      );
    default:
      return <></>;
  }
}

export default control;
