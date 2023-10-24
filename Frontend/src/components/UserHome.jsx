import "./css/UserHome.css";
import tableIcon from "../assets/table.svg";
import plus from "../assets/plus.svg";

export default function UserHome() {
  const tables = JSON.parse(localStorage.getItem("tables"));

  return (
    <div className="container d-flex">
      <div id="side-bar" className="d-flex flex-column mt-5">
        <SideBarButton label="Tables" icon={tableIcon}></SideBarButton>
      </div>
      <div className="mt-5 w-100">
        <div className="d-grid align-items-center h-100 w-100" id="tables">
          <Table>
            <h2>New table</h2>
            <img src={plus} alt="" height={25} />
          </Table>
        </div>
      </div>
    </div>
  );

  function SideBarButton(props) {
    return (
      <button className="btn side-bar-btn text-start d-flex align-items-center gap-3" onClick={props.onClick}>
        <img src={props.icon} height={20} alt="" className="side-button-icon" />
        {props.label}
      </button>
    );
  }

  function Table(props) {
    return <div className="table-box p-2 align-items-center d-flex text-center flex-column">{props.children}</div>;
  }
}
