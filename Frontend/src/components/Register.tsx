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
    <div id="login-box" className="container border border-info bg-dark d-flex flex-column">
      <form id="loginForm" className="text-center" onSubmit={submitNewUser}>
        <div className="form-floating">
          <input name="user_name" type="username" className="form-control" placeholder="Username" required />
          <label htmlFor="name" className="text-info">
            Username
          </label>
        </div>
        <div className="form-floating">
          <input name="user_email" type="email" className="form-control" placeholder="Email" required />
          <label htmlFor="email" className="text-info">
            Email
          </label>
        </div>
        <div className="form-floating">
          <input name="user_password" type="password" className="form-control" placeholder="Password" required />
          <label htmlFor="password" className="text-info">
            Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <a href="/login" className="link-info text-center">
        Log in instead
      </a>
    </div>
  );
}