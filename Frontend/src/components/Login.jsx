import FormInput from "./FormInput";
import { useState } from "react";
import "./css/LoginRegister.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  function submitLogin(e) {
    setProcessing(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    // const formJson = Object.fromEntries(formData);
    // console.log(formJson);

    function getLoginToken() {
      if (checkValidLogin()) {
        fetch()
      }
    }

    function checkValidLogin(email, password) {
      return fetch(`http://142.93.148.156:80/signin/auth/validate?email=${email}&password=${password}`, {
        method: "GET",
      })
        .then(function (response) {
          return response.json(); // Returns promise
        })
        .then(function (data) {
          return JSON.parse(data); // returns the result of the above promise
        });
    }
  }

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      pattern: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
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
            {inputs.map((input) => (
              <FormInput key={input.id} {...input}></FormInput>
            ))}
            {errorMessage !== "" && <div className="text-danger mb-4">{errorMessage}</div>}
            <button className="btn submit-btn" type="submit" disabled={processing ? true : false}>
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
