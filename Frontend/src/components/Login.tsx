import "./css/LoginRegister.css";

function submitLogin(e: any) {
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

export default function Login() {
  return (
    <div id="border-wrap">
      <div id="login-box" className="d-flex flex-column p-4 pt-5 pb-5">
        <div>
          <form id="loginForm" className="text-center" onSubmit={submitLogin}>
            <div className="form-floating">
              <input name="user_email" type="email" className="form-control" placeholder="Email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating">
              <input name="user_password" type="password" className="form-control" placeholder="Password" required />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn" type="submit">
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
