import { useState } from "react";
import "./css/LoginRegister.css";
import FormInput from "./FormInput";

function submitNewUser(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formJson = Object.fromEntries(formData);
  console.log(formJson);
  
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
      text: "Username",
      name: "username",
      type: "text",
      formID: "username",
      requred: "true"
    },
    {
      id: 2,
      text: "Email",
      name: "email",
      type: "email",
      formID: "email",
      requred: "true"
    },
    {
      id: 3,
      text: "Password",
      name: "password",
      type: "password",
      formID: "password",
      requred: "true"
    },
    {
      id: 4,
      text: "Confirm Password",
      name: "confirm-password",
      type: "password",
      formID: "confirm-password",
      requred: "true"
    }
  ]
  
  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          {inputs.map(input => (
            <FormInput key={input.id} {...input} value={values[input.name]} />
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
