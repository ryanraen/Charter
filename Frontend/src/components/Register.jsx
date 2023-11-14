import { useState } from "react";
import "./css/LoginRegister.css";
import FormInput from "./FormInput";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
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
      pattern: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
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

  function submitNewUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("http://142.93.148.156:80/signin/register", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: formData,
    })
      .then((response) => {
        // window.location.href = "/u";
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      // fetch("http://142.93.148.156:80/signin/get/all", { method: "GET", headers: { "Access-Control-Allow-Origin": "*" } }).then((res) => {
      //     console.log(res.json());
      // })
  }

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name] || ""} onChange={onChange} />
          ))}
          <button type="submit" className="btn submit-btn">
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
