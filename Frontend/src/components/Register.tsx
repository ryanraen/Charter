function submitNewUser(e: any) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formJson = Object.fromEntries(formData);
  console.log(formJson);

  fetch("/addUser", {
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

export default function Register() {
  return (
    // <div id="border-wrap">
      <div id="login-box" className="container-sm d-flex flex-column">
        <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
          <div className="form-floating">
            <input id="name" name="user_name" type="username" className="form-control" placeholder="Username" required autoComplete="on" />
            <label htmlFor="name">Username</label>
          </div>
          <div className="form-floating">
            <input id="email" name="user_email" type="email" className="form-control" placeholder="Email" required autoComplete="on" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating">
            <input id="password" name="user_password" type="password" className="form-control" placeholder="Password" required />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn">
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
    // </div>
  );
}
