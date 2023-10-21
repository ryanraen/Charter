import FormInput from "./FormInput";
import "./css/LoginRegister.css";

function submitLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // const formJson = Object.fromEntries(formData);
  // console.log(formJson);

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the backend
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
    errorMessage: "Email is invalid",
    required: true
  },
  {
    id: 2,
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "password",
    required: true
  }
]

export default function Login() {
  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <div>
          <form id="loginForm" className="text-center" onSubmit={submitLogin}>
            {inputs.map(input => (
              <FormInput key={input.id} {...input}></FormInput>
            ))}
            <button className="btn submit-btn" type="submit">
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
