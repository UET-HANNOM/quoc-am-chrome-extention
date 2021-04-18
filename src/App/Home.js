/*global chrome*/
import React, { useEffect, useState } from "react";
import photoIcon from "./icons/photo.svg";
import screenshotIcon from "./icons/screenshot.svg";
import cancelIcon from "./icons/cancel.svg";
import historyIcon from "./icons/history.svg";
const HomeScreen = () => {
  const [tab, setTab] = useState(1);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState("");
  const [history, setHistory] = useState(false);
  const _onChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage(reader.result);
      setPreview(true);
      setTab(2);
    }.bind();
    console.log(url);
  };
  const takeScreenShot = () => {
    chrome.runtime.sendMessage({
      from: "cs-take",
    });
  };
  useEffect(() => {
    console.log(1, window.mesdmm);
  }, []);
  const goHome = () => {
    setPreview(false);
    setText("");
    setTab(1);
  };
  const handleScan = () => {
    setText(` Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, eveniet
repudiandae? Ullam, possimus ad doloribus neque cupiditate, amet
accusantium officia tenetur illo harum, nihil impedit cumque voluptate
nam eius libero.`);
    setTab(3);
  };
  const openHistory = () => {
    setHistory(true);
    setTab(4);
  };
  const homeTab = (
    <div className="cs-home">
      <img
        src={historyIcon}
        alt=""
        className="cs-icon-top"
        onClick={openHistory}
      />
      <div className="cs-home-cap">
        <button onClick={takeScreenShot}>
          <img src={screenshotIcon} alt="icon" />
        </button>
      </div>
      {JSON.stringify(window.mesdmm)}
      <hr />
      <div className="cs-home-up">
        <label htmlFor="img">
          <img src={photoIcon} alt="icon" />
        </label>
        <input type="file" name="img" id="img" hidden onChange={_onChange} />
      </div>
    </div>
  );
  switch (tab) {
    case 1:
      return homeTab;
    case 2:
      return (
        <div className="cs-preview-img">
          <img
            src={cancelIcon}
            alt=""
            className="cs-icon-top"
            onClick={goHome}
          />
          <img src={image} alt="" />
          <button onClick={handleScan}>Scan</button>
        </div>
      );
    case 3:
      return (
        <div className="cs-view-result">
          <img
            src={cancelIcon}
            alt=""
            className="cs-icon-top"
            onClick={goHome}
          />
          <p>{text}</p>
        </div>
      );
    case 4:
      return (
        <div className="cs-history">
          <img
            src={cancelIcon}
            alt=""
            className="cs-icon-top"
            onClick={goHome}
          />
          <p onClick={handleScan}>Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
      );
    default:
      return homeTab;
  }
};

export default HomeScreen;
