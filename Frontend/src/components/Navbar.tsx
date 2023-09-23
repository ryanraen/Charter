import "./css/Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <a href="/" className="navbar-brand">
          Charter
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" aria-current="page" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link">
              Log in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
