import FormInput from "./FormInput";
import { validateLogin } from "../util/API";
import { useState } from "react";
import "./css/LoginRegister.css";
import { getCookie, setCookie } from "../util/CookieManager";
import { loginUser, getErrorMessage } from "../util/LoginUtil";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  async function submitLogin(e) {
    setDisableSubmit(true);
    e.preventDefault();
    const formElements = Object.fromEntries(new FormData(e.target));
    const validateLoginPromise = await validateLogin(formElements.email, formElements.password);

    if (validateLoginPromise.status == "true") {
      loginUser(validateLoginPromise);
      setErrorMessage("");
    } else {
      setErrorMessage(getErrorMessage(validateLoginPromise));
    }

    setDisableSubmit(false);
  }

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      pattern: "^\\S+@\\S+\\.\\S+$",
      errorMessage: "Email is invalid",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "password",
      required: true,
    },
  ];

  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <div>
          <form id="loginForm" className="text-center" onSubmit={submitLogin}>
            {inputs.map(input => (
              <FormInput key={input.id} {...input}></FormInput>
            ))}
            {errorMessage !== "" && <div className="text-danger mb-4">{errorMessage}</div>}
            <button className="btn submit-btn" type="submit" disabled={disableSubmit ? true : false}>
              Log in
            </button>
          </form>
        </div>
        <button
          id="page-swap-button"
          className="align-self-center"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Make an account
        </button>
      </div>
    </div>
  );
}
