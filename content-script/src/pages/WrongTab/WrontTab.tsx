/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { InfoBigIcon } from "../../assets";
import { Button, Header } from "../../components";
import "../../style/content/wrongTab.scss";
import { BUTTON_ENUM, LINKEDIN_PAGE_ENUM } from "../../types/global.types";

import { useWrongTab } from "../../hooks/useWrongTab";
function WrontTab() {
  const { inLinkedinButWrong } = useWrongTab();

  return (
    <section className="wrongTab">
      <InfoBigIcon />
      <Header>Please, pay attention!</Header>

      {!inLinkedinButWrong ? (
        <p className="wrongTab__text">
          The extension works only on LinkedIn or Sales Navigator's <br />
          <strong>Contact</strong> or <strong>Company</strong> pages. <br />
          To start scraping data, go to the following links.
        </p>
      ) : (
        <p className="wrongTab__text">
          The extension works only on LinkedIn or Sales Navigator's <br />
          <strong>Contact</strong> or <strong>Company</strong> pages. <br />
          To begin scraping, please navigate to a Contact or Company page.
        </p>
      )}
      {!inLinkedinButWrong && (
        <div className="wrongTab__actions">
          <Button
            type={BUTTON_ENUM.BLUE}
            onClick={() => {
              chrome.tabs.create({ url: LINKEDIN_PAGE_ENUM.SALES });
            }}
            text="Go to LinkedIn"
          />
          <Button
            type={BUTTON_ENUM.GOLD}
            onClick={() => {
              chrome.tabs.create({ url: LINKEDIN_PAGE_ENUM.LINKEDIN });
            }}
            text="Go to Sales Navigator"
          />
        </div>
      )}
    </section>
  );
}

export default WrontTab;
