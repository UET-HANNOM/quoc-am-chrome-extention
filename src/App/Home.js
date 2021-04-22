/*global chrome*/
import React, { useEffect, useState } from "react";
import photoIcon from "./icons/photo.svg";
import screenshotIcon from "./icons/screenshot.svg";
import cancelIcon from "./icons/cancel.svg";
import historyIcon from "./icons/history.svg";
chrome.storage.sync.get((config) => {
  // alert("....")
  // state.method.forEach((item) => item.checked = item.id === config.method)
  // state.format.forEach((item) => item.checked = item.id === config.format)
  // state.save.forEach((item) => item.checked = item.id === config.save)
  // state.dpr.forEach((item) => item.checked = item.id === config.dpr)
  // m.redraw()
})
const HomeScreen = () => {
  const [tab, setTab] = useState(1);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);
  const [text, setText] = useState("");
  const [history, setHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState()
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
    // chrome.runtime.onMessage.addListener(function (res) {
    //   console.log(res)
    //   setState(res)
    //   alert(res);
    // });
  }, []);
  const goHome = () => {
    setPreview(false);
    setText("");
    setTab(1);
  };
  const handleScan = () => {
    setLoading(true);
    debugger;
    fetch("https://quoc-am-server.herokuapp.com/sampleData", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: "" }),
    })
      .then((response) => response.json())
      .then((data) => {
        debugger;

        setText(data);
        setTab(3);
        console.log("Success:", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
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
      {JSON.stringify(state)}
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
          <button onClick={handleScan} disabled={loading}>
            Scan<div class="loader" hidden={!loading}></div>
          </button>
        </div>
      );
    case 3:
      return <ViewResult data={text} image={image} goHome={goHome} />;
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
const ViewResult = ({ goHome, data, image }) => {
  function openCity(e = null, cityName) {
    var i;
    var x = document.getElementsByClassName("cs-result-text");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    var y = document.getElementsByClassName("cs-bar-item");
    for (i = 0; i < y.length; i++) {
      y[i].style.opacity = 0.5;
    }
    e.target.style.opacity = 1;
    document.getElementById(cityName).style.display = "block";
  }
  return (
    <div className="cs-view-result">
      <img src={cancelIcon} alt="" className="cs-icon-top" onClick={goHome} />
      <div>
        <div className="cs-bar">
          <button
            className="cs-bar-item"
            onClick={(e) => openCity(e, "van-ban-dich")}
          >
            Văn bản dịch
          </button>
          <button
            className="cs-bar-item"
            onClick={(e) => openCity(e, "van-ban-goc")}
          >
            Văn bản gốc
          </button>
          <button
            className="cs-bar-item"
            onClick={(e) => openCity(e, "anh-goc")}
          >
            Ảnh gốc
          </button>
        </div>
        <div id="van-ban-dich" className="cs-result-text">
          <p>{data.text1}</p>
        </div>

        <div
          id="van-ban-goc"
          className="cs-result-text"
          style={{ display: "none" }}
        >
          <p>{data.text2}</p>
        </div>

        <div
          id="anh-goc"
          className="cs-result-text"
          style={{ display: "none" }}
        >
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};
