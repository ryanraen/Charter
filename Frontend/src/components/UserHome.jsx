import "./css/UserHome.css";
import tableIcon from "../assets/table.svg";
import plus from "../assets/plus.svg";
import { useState } from "react";

export default function UserHome() {
  const [tableModalOpen, setTableModalOpen] = useState(false);

  function createNewTable() {
    return <div></div>;
  }

  const tables = JSON.parse(localStorage.getItem("tables"));

  return (
    <div className="container d-flex">
      <div id="side-bar" className="d-flex flex-column mt-5">
        <SideBarButton label="Tables" icon={tableIcon}></SideBarButton>
      </div>
      <div className="mt-5 w-100">
        <div className="d-grid align-items-center h-100 w-100" id="tables">
          <Table onClick={() => setTableModalOpen(true)}>
            <h2>New table</h2>
            <img src={plus} alt="" height={25} />
          </Table>
          {JSON.stringify(tables) != "[{}]" && tables.map((table) => <Table key={table.id} />)}
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
    return (
      <div onClick={props.onClick} className="table-box p-2 align-items-center d-flex text-center flex-column justify-content-center">
        {props.children}
      </div>
    );
  }
}
