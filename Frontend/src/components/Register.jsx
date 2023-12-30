import { useState } from "react";
import "./css/LoginRegister.css";
import { getLoginToken, registerAccount } from "../util/API";
import FormInput from "./inputs/FormInput";
import { setCookie } from "../util/CookieManager";

export default function Register() {
  async function submitNewUser(e) {
    e.preventDefault();
    setDisableSubmit(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    const accountResult = await registerAccount(formData);

    if (accountResult.status == "success") {
      const tokenPromise = await getLoginToken(accountResult.id);
      setCookie("token", tokenPromise.token, tokenPromise.expire);  
    } else {
      setErrorMessage("User already exists, please log in with that instead");
    }
    setDisableSubmit(false);
  }

  const [errorMessage, setErrorMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "name",
      type: "text",
      placeholder: "username",
      errorMessage: "Username must be 3-16 characters and contain no special characters",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "email",
      errorMessage: "Email is invalid",
      pattern: "^\\S+@\\S+\\.\\S+$",
      required: true,
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
      errorMessage: "Password must be 8-128 characters including one number and special character",
      pattern: "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$~!%*#?&])[A-Za-z0-9@$~!%*#?&]{8,128}$",
      required: true,
    },
    {
      id: 4,
      label: "Confirm Password",
      name: "",
      type: "password",
      placeholder: "confirm-password",
      errorMessage: "Passwords don't match",
      pattern: values.password,
      required: true,
    },
  ];

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          {inputs.map(input => (
            <FormInput key={input.id} {...input} value={values[input.name] || ""} onChange={onChange} />
          ))}
          {errorMessage !== "" && <div className="text-danger mb-4">{errorMessage}</div>}
          <button type="submit" className={"btn submit-btn"} disabled={disableSubmit ? true : false}>
            Register
          </button>
        </form>
        <button
          id="page-swap-button"
          className="align-self-center"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Log in instead
        </button>
      </div>
    </div>
  );
}
