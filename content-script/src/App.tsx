/// <reference types="chrome" />
import React, { useState } from "react";
import { DoubleNextIcon, CloseIconBigger, LogoIcon } from "./assets";
import { useStore } from "./store";
import { usePaging } from "./hooks/usePaging";
import { Loader } from "./components";
import { LINKEDIN_PAGE_ENUM } from "./types/global.types";

function App() {
  const { setSidebarOpen, sidebarOpen, loading } = useStore();
  const { CurrentPage, updated } = usePaging();
  return (
    <div id="udsextension" className={`${sidebarOpen && "open"}`}>
      <button
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
        className={`linkedinSidePanelOpenClose`}
      >
        <span>
          <DoubleNextIcon />
        </span>
      </button>
      <div
        id="linkedin-side-panel"
        className={`linkedinSidePanel main ${window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES) && "salesExtension"}`}
      >
        {updated && (
          <>
            <div className="closeIconLinkedin">
              <span
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <CloseIconBigger />
              </span>
            </div>
            {CurrentPage()}
            {loading && <Loader />}
            <div className="main__footer">
              <LogoIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
