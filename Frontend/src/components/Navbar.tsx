import "./css/Navbar.css";
import { useState } from "react";
import gear from "../assets/gear.svg";
import logout from "../assets/logout.svg";
import downarrow from "../assets/dropdown.svg";

const account = JSON.parse(localStorage.getItem("account") || "{}");
const loggedIn = JSON.stringify(account) == "{}" ? false : true;

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <a href="/" className="navbar-brand">
          Charter
        </a>
        <ul className="navbar-nav" id="navbar-right">
          <NavItem href={loggedIn ? "/u" : "/"} item="Home" />
          {!loggedIn && <NavItem href="/login" item="Login" />}
          {loggedIn && (
            <NavItem href="#" item={account.user_name} styleid={"accountHeader"} rightIcon={downarrow}>
              <DropdownMenu />
            </NavItem>
          )}
        </ul>
      </div>
    </nav>
  );
}

function NavItem(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item navitem">
      <a href={props.href} className="nav-link navlink" id={props.styleid} onClick={() => setOpen(!open)}>
        {props.item}
        {props.rightIcon != undefined && <img src={props.rightIcon} alt="" width={15} height={15}/>}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  function DropdownButton(props: any) {
    return (
      <button className="btn dropdown-btn d-flex" onClick={props.func}>
        <img src={props.leftIcon} alt="" className="dropdown-icon" />
        <div className="dropdown-label">{props.label}</div>
      </button>
    );
  }

  return (
    <div className="drop-down position-absolute d-flex flex-column p-3 rounded-3">
      <DropdownButton label="Settings" leftIcon={gear} func={() => (location.href = "/settings")} />
      <DropdownButton
        label="Log out"
        leftIcon={logout}
        func={() => {
          localStorage.removeItem("account");
          location.href = "/";
        }}
      />
    </div>
  );
}
