import "./css/Login.css";

export default function Login() {
  return (
    <>
      <div id="login-box" className="container border border-info bg-dark d-flex flex-column">
        <form action="" method="POST" id="loginForm">
          <div className="form-floating">
            <input type="email" className="form-control" placeholder="Email" required />
            <label htmlFor="email" className="text-info">
              Email
            </label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder="Password" required />
            <label htmlFor="password" className="text-info">
              Password
            </label>
          </div>
          <input type="submit" value="Log in" className="btn btn-primary" />
        </form>
        <a href="/register" className="link-info">
          Make an account
        </a>
      </div>
    </>
  );
}
