import { useState } from "react";
import "./css/settings.css";
import { getCookie } from "../util/CookieManager";

export default function Settings() {
  const [settings, setSettings] = useState(1);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column settings-container">
        <h2 className="settings-header">SETTINGS</h2>
        <div className="d-flex justify-content-center">
          <div className="line-grad grad-left"></div>
          <div className="line"></div>
          <div className="line-grad grad-right"></div>
        </div>
        <div>
          <h4 className="mt-4 account-header">ACCOUNT NAME</h4>
          <h5 className="account-info-box">{getCookie("username")}</h5>
        </div>

        <div>
          <h4 className="mt-4 account-header">EMAIL</h4>
          <h5 className="account-info-box">{getCookie("username")}</h5>
        </div>

        <button className="btn settings-btn">
          <h3 className="btn-text">Save</h3>
        </button>
      </div>
    </div>
  );
}
