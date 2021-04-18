 /*global chrome*/
import React, { useEffect, useState } from "react";
import photoIcon from "./icons/photo.svg";
import screenshotIcon from "./icons/screenshot.svg";
const HomeScreen = () => {
  const [state, setState] = useState()
  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, res) => {
      setState(req)
    });

  }, [])
  const takeScreenShot = () => {
    chrome.runtime.sendMessage({
      from: "cs-take"
    });
  }
  return (
    <div className="cs-home">
      <div className="cs-home-cap">
        <button onClick={takeScreenShot}>
          <img src={screenshotIcon} alt="icon" />
        </button>
      </div>
      {JSON.stringify(state)}
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
