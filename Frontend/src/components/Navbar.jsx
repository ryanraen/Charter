import "./css/Navbar.css";
import { useState } from "react";
import gear from "../assets/gear.svg";
import logout from "../assets/logout.svg";
import downarrow from "../assets/dropdown.svg";
import { deleteCookie, getCookie } from "../util/CookieManager";
import { nullifyToken } from "../util/API";



export default function Navbar( {username}) {

  const loggedIn = (username == null || username == "") ? false : true;

  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <a href="/" className="navbar-brand">
          Charter
        </a>
        <ul className="navbar-nav">
          <NavItem href={loggedIn ? "/u" : "/"} text="Home" />
          {loggedIn ? (
            <NavItem href="#" text={username} styleid={"accountHeader"} rightIcon={downarrow}>
              <DropdownMenu />
            </NavItem>
          ) : (
            <NavItem href="/login" text="Login" />
          )}
        </ul>
      </div>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item mx-2">
      <a href={props.href} className="nav-link navlink d-flex align-items-center" id={props.styleid} onClick={() => setOpen(!open)}>
        {props.text}
        {props.rightIcon != undefined && <img className={"m-1 navitem-icon".concat(open ? " rotate-icon" : "")} src={props.rightIcon} alt="" width={12} height={12} />}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  function DropdownButton(props) {
    return (
      <button className="btn dropdown-btn d-flex" onClick={props.func}>
        <img src={props.leftIcon} alt="" />
        <div className="dropdown-label">{props.label}</div>
      </button>
    );
  }

  return (
    <div className="drop-down position-absolute d-flex flex-column p-3 rounded-3 z-3">
      <DropdownButton label="Settings" leftIcon={gear} func={() => (location.href = "/u/settings")} />
      <DropdownButton
        label="Log out"
        leftIcon={logout}
        func={async () => {
          try {
            deleteCookie("username");
            deleteCookie("email")
            deleteCookie("tokenExpiry");
            deleteCookie("userID");
            deleteCookie("token");
            nullifyToken(getCookie("userID"));
          } finally {
            location.href = "/";
          }
        }}
      />
    </div>
  );
}
