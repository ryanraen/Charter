import "./css/UserHome.css";
import tableIcon from "../assets/table.svg";

export default function UserHome() {
  const tables = JSON.parse(localStorage.getItem("tables"));

  function createTable(name) {
    tables[name] = Math.random()
    localStorage.setItem("tables", JSON.stringify(tables));
  }

  return (
    <div className="container border-black border d-flex">
      <div id="side-bar" className="d-flex flex-column mt-5">
        <SideBarButton label="Tables" icon={tableIcon}></SideBarButton>
      </div>
      <div className="d-flex border-black mt-5" id="tables">
        {tables.toArray.map(table => (
          <Table />
        ))}
      </div>
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

function Table(props) {
  return <div className="table-list-table"></div>;
}
