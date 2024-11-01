import React from "react";
import "../../style/component/alert.scss";
import { AlertPropTypes } from "./Alert.types";

const Alert = ({ text }: AlertPropTypes) => {
  return <h1 className="alert">{text}</h1>;
};

export default Alert;
