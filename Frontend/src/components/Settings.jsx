import { useState } from "react";
import "./css/settings.css";
import { getCookie, setCookie } from "../util/CookieManager";
import { changeAccountEmail, changeAccountPassword, changeAccountUsername, validateLogin } from "../util/API";
import spinner from "../assets/spinner.svg";
import check from "../assets/check.svg";
import x from "../assets/x.svg";

export default function Settings({ setNavBarUsername }) {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [currentName, setCurrentName] = useState(getCookie("username"));
  const [currentEmail, setCurrentEmail] = useState(getCookie("email"));

  const [nameProcessingState, setNameProcessingState] = useState(0); // 0 - inactive, 100 - loading, 200 - success, 400+ - failed
  const [emailProcessingState, setEmailProcessingState] = useState(0);
  const [passwordProcessingState, setPasswordProcessingState] = useState(0);

  const [newPassword, setNewPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSaveInfo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("userID", getCookie("userID"));

    const usernameFormData = new FormData();
    const emailFormData = new FormData();

    usernameFormData.append("username", formData.get("username"));
    emailFormData.append("email", formData.get("email"));

    usernameFormData.append("userID", getCookie("userID"));
    emailFormData.append("userID", getCookie("userID"));

    if (editingName && usernameFormData.get("username") != currentName) {
      handleUsername();
    }
    if (editingEmail && emailFormData.get("email") != currentEmail) {
      handleEmail();
    }

    async function handleUsername() {
      setUsernameError("");
      setNameProcessingState(100);
      const result = await changeAccountUsername(usernameFormData);

      switch (result.status) {
        case "success":
          setNameProcessingState(200);
          setCurrentName(usernameFormData.get("username"));
          setCookie("username", usernameFormData.get("username"));
          setNavBarUsername(usernameFormData.get("username"));
          break;
        case "failure":
          setNameProcessingState(400);
          setUsernameError("This username is already in use");
          break;
        case "offline":
          setNameProcessingState(404);
          setUsernameError("Unable to reach server, please try again later");
          break;
        default:
          setNameProcessingState(500);
          setUsernameError("An unexpected error occured");
      }
    }

    async function handleEmail() {
      setEmailError("");
      setEmailProcessingState(100);
      const result = await changeAccountEmail(emailFormData);

      switch (result.status) {
        case "success":
          setEmailProcessingState(200);
          setCurrentEmail(emailFormData.get("email"));
          setCookie("email", emailFormData.get("email"));
          break;
        case "failed":
          setEmailProcessingState(400);
          setEmailError("This email is already in use");
          break;
        case "offline":
          setEmailProcessingState(404);
          setEmailError("Unable to reach server, please try again later");
          break;
        default:
          setEmailProcessingState(500);
          setEmailError("An unexpected error occured");
      }
    }

    setEditingName(false);
    setEditingEmail(false);
  }

  setTimeout(() => {
    document.body.className = "";
  }, 300);

  async function handleSavePassword(e) {
    e.preventDefault();
    setPasswordError("");
    const formData = new FormData(e.target);
    const passwordFormData = new FormData();

    passwordFormData.append("password", formData.get("newPassword"));
    passwordFormData.append("userID", getCookie("userID"));

    setEditingPassword(false);
    setPasswordProcessingState(100);
    const result = await validateLogin(getCookie("email"), formData.get("previousPassword"));

    switch (result.status) {
      case "true":
        const passwordSubmitionResult = await changeAccountPassword(passwordFormData);
        displayPassSubResult(passwordSubmitionResult);
        break;
      case 500:
        setPasswordError("Incorrect current password");
        setPasswordProcessingState(400);
        break;
      default:
        if (result.message == "Failed to fetch") {
          setPasswordError("Unable to reach server, please try again later");
          setPasswordProcessingState(404);
        }
    }

    function displayPassSubResult(result) {
      switch (result.status) {
        case "success":
          setPasswordProcessingState(200);
          break;
        case "failure":
          setPasswordProcessingState(400);
          setPasswordError("An error occured while changing password");
          break;
        default:
          setPasswordError("An unexpected error occured");
          setPasswordProcessingState(500);
          break;
      }
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case 0:
        return;
      case 100:
        return spinner;
      case 200:
        return check;
      default:
        return x;
    }
  }

  function Line() {
    return (
      <div className="d-flex justify-content-center mb-4">
        <div className="line-grad grad-left"></div>
        <div className="line"></div>
        <div className="line-grad grad-right"></div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <div className={`d-flex flex-column settings-container ${editingPassword && "animate-settings-container"}`}>
        <h2 className="settings-header">SETTINGS</h2>
        <Line />
        <form onSubmit={handleSaveInfo}>
          <div className="mb-4">
            <h4 className="account-header">
              ACCOUNT NAME <img src={getStatusIcon(nameProcessingState)} className={`icon-status ${nameProcessingState == 100 && "icon-spinner"}`} />
            </h4>
            <div className="d-flex align-items-center">
              <h5 className={`account-info-box ${editingName && "editing"}`} role="button" onClick={() => setEditingName(true)}>
                {editingName ? (
                  <input required name="username" pattern="^[A-Za-z0-9]{3,16}" autoFocus className={`edit-info-input ${editingName && "editing"}`} defaultValue={currentName} />
                ) : (
                  currentName
                )}
              </h5>
              <div className={`flex-grow-1 justify-content-center d-flex ${usernameError == "" && "hide-txt"}`}>
                <h4 className={`text-danger settings-error-txt ${usernameError == "" && "hide-txt"}`}>{usernameError}</h4>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="account-header">
              EMAIL <img src={getStatusIcon(emailProcessingState)} className={`icon-status ${emailProcessingState == 100 && "icon-spinner"}`} />
            </h4>
            <div className="d-flex align-items-center">
              <h5 className={`account-info-box ${editingEmail && "editing"}`} role="button" onClick={() => setEditingEmail(true)}>
                {editingEmail ? <input required name="email" pattern="^\S+@\S+\.\S+$" autoFocus className="edit-info-input editing" defaultValue={currentEmail} /> : currentEmail}
              </h5>
              <div className={`flex-grow-1 justify-content-center d-flex ${emailError == "" && "hide-txt"}`}>
                <h4 className={`text-danger settings-error-txt ${emailError == "" && "hide-txt"}`}>{emailError}</h4>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button className="btn settings-btn">
              <h3 className="settings-btn-text">Save</h3>
            </button>
            <button
              type="button"
              className="btn settings-btn"
              onClick={() => {
                setEditingEmail(false);
                setEditingName(false);
              }}
            >
              <h3 className="settings-btn-text">Cancel</h3>
            </button>
          </div>
        </form>

        <form onSubmit={handleSavePassword}>
          <div className="mb-4">
            <h4 className="account-header">
              {editingPassword ? "NEW PASSWORD" : "PASSWORD"} <img src={getStatusIcon(passwordProcessingState)} className={`icon-status ${passwordProcessingState == 100 && "icon-spinner"}`} />
            </h4>
            <div className="d-flex align-items-center">
              <h5 className={`account-info-box ${editingPassword && "editing"}`} role="button" onClick={() => setEditingPassword(true)}>
                {editingPassword ? (
                  <input
                    required
                    name="newPassword"
                    type="password"
                    onChange={e => {
                      setNewPassword(e.target.value);
                    }}
                    pattern="^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$~!%*#?&])[A-Za-z0-9@$~!%*#?&]{8,128}$"
                    autoFocus
                    className="edit-info-input editing"
                  />
                ) : (
                  "●●●●●●●●●●"
                )}
              </h5>
              <div className={`flex-grow-1 justify-content-center d-flex ${passwordError == "" && "hide-txt"}`}>
                <h4 className={`text-danger settings-error-txt ${passwordError == "" && "hide-txt"}`}>{passwordError}</h4>
              </div>
            </div>
          </div>
          {editingPassword && (
            <div className="position-absolute">
              <div className="mb-4">
                <h4 className="account-header">CONFIRM PASSWORD</h4>
                <h5 className={`account-info-box ${editingPassword && "editing"}`} role="button" onClick={() => setEditingPassword(true)}>
                  <input required name="confirmPassword" type="password" pattern={newPassword} className="edit-info-input editing" />
                </h5>
              </div>

              <div className="mb-4">
                <h4 className="account-header">PREVIOUS PASSWORD</h4>
                <h5 className={`account-info-box ${editingPassword && "editing"}`} role="button" onClick={() => setEditingPassword(true)}>
                  <input required name="previousPassword" type="password" className="edit-info-input editing" />
                </h5>
              </div>

              <div>
                <button className="btn settings-btn">
                  <h3 className="settings-btn-text">Save</h3>
                </button>
                <button
                  type="button"
                  className="btn settings-btn"
                  onClick={() => {
                    setEditingPassword(false);
                    setNewPassword("");
                  }}
                >
                  <h3 className="settings-btn-text">Cancel</h3>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
