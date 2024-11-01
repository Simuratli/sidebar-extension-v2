import React from "react";
import "../../style/content/error.scss";
import { InfoBigIcon } from "../../assets";
import { Header, Button, TutorialButton } from "../../components";
import { useStore } from "../../store";
import {
  PAGE_ENUM,
  BUTTON_ENUM,
  ERROR_PAGE_TYPE,
} from "../../types/global.types";
import { ErrorPagePropType } from "./Error.types";
function Error({ page }: ErrorPagePropType) {
  const { setPage, errorForCredentials, errorText } = useStore();
  return (
    <section className="errorPage">
      <InfoBigIcon />
      <Header>Something went wrong...</Header>
      <p className="errorPage__text">
        {page === ERROR_PAGE_TYPE.LOGIN ? errorForCredentials : errorText}
      </p>
      {page === ERROR_PAGE_TYPE.ACTION && (
        <p className="errorPage__text">Please restart the extension.</p>
      )}
      <TutorialButton />
      <div className="errorPage__footer">
        <Button
          type={BUTTON_ENUM.GOLD}
          text={page === ERROR_PAGE_TYPE.LOGIN ? "Try again" : "Restart"}
          onClick={() => {
            page === ERROR_PAGE_TYPE.LOGIN
              ? setPage(PAGE_ENUM.SETUP)
              : window.location.reload();
          }}
        />
        {page === ERROR_PAGE_TYPE.ACTION && (
          <Button
            type={BUTTON_ENUM.BLUE}
            text="Login again"
            onClick={() => {
              setPage(PAGE_ENUM.SETUP);
            }}
          />
        )}
      </div>
    </section>
  );
}

export default Error;
