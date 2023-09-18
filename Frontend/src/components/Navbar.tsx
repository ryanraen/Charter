export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="#" className="navbar-brand">
          Online ToDo Manager
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" aria-current="page" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Log in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
