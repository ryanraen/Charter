import "./css/UserHome.css";
import tableIcon from "../assets/table.svg";

export default function UserHome() {
  return (
    <div className="container border-black border d-flex">
      <div id="side-bar" className="d-flex flex-column mt-5">
        <SideBarButton label="Tables" icon={tableIcon}></SideBarButton>
      </div>
      <div className="d-flex border-black mt-5" id="tables"></div>
    </div>
  );
}

function SideBarButton(props) {
  return (
    <button className="btn side-bar-btn text-start d-flex align-items-center gap-3">
      <img src={props.icon} height={20} alt="" className="side-button-icon" />
      {props.label}
    </button>
  );
}

function table() {
  
}
