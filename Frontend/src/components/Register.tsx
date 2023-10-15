import { useState } from "react";
import "./css/LoginRegister.css";
import FormInput from "./FormInput";

function submitNewUser(e: any) {
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
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // });
  
  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          <FormInput objectID="username" type={"username"} text="Username" required></FormInput>
          <FormInput objectID="email" type={"email"} text="Email" required></FormInput>
          <FormInput objectID="password" type={"password"} text="Password" required></FormInput>
          <FormInput objectID="confirm-password" type={"password"} text="Confirm Password" required></FormInput>
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
