import { useState } from "react";
import "./css/LoginRegister.css";
import FormInput from "./FormInput";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "username",
      errorMessage: "Username must be 3-16 characters and contain no special characters",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "email",
      errorMessage: "Email is invalid",
      pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
      required: true
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "password",
      errorMessage: "Password must be 8-128 characters including one number and special character",
      pattern: "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,128}$",
      required: true
    },
    {
      id: 4,
      label: "Confirm Password",
      name: "",
      type: "password",
      placeholder: "confirm-password",
      errorMessage: "Passwords don't match",
      pattern: values.password,
      required: true
    }
  ]

  function submitNewUser(e) {
    e.preventDefault();

    const date = new Date();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData);
    formJson.date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    localStorage.setItem("account", JSON.stringify(formJson));
    window.location.href = "/u";
  
    // fetch("/addUser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response from the backend
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  function onChange(e) {
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          {inputs.map(input => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
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
