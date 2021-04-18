/*global chrome*/
import React, { useEffect } from "react";
import photoIcon from "./icons/photo.svg";
import screenshotIcon from "./icons/screenshot.svg";
const HomeScreen = () => {
  const takeScreenShot = () => {
    chrome.runtime.sendMessage({
      from: "cs-take",
    });
  };
  useEffect(() => {
    console.log(1,window.mesdmm)
  }, [])
  return (
    <div className="cs-home">
      <div className="cs-home-cap">
        <button onClick={takeScreenShot}>
          <img src={screenshotIcon} alt="icon" />
        </button>
      </div>
      {JSON.stringify(window.mesdmm)}
      <hr />
      <div className="cs-home-up">
        <button>
          <img src={photoIcon} alt="icon" />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
