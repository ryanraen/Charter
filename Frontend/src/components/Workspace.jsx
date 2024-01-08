import { useParams } from "react-router-dom";
import "./css/Workspace.css";
import chart from "../assets/chart.svg";
import question from "../assets/question.svg";
import { useEffect, useRef, useState } from "react";
import { authenticateWorkspace, createChart, getChartsDisplay, getWorkspaceCharts, getWorkspaceData, getWorkspaceName } from "../util/API";
import { getCookie } from "../util/CookieManager";
import { isOverflown } from "../util/Util";
import ChartArea from "./ChartArea";
import Modal from "./Modal";

export default function Workspace() {
  const URL = useParams();

  const [charts, setCharts] = useState([]);

  const [selectedSideButton, setSelectedSideButton] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("Loading...");
  const [successfulLoad, setSuccessfulLoad] = useState(false);
  const sidebarHeaderRef = useRef(null);

  useEffect(() => {
    async function loadWorkspaceData() {
      const authenticationResult = await authenticateWorkspace(getCookie("userID"), URL.id);
      switch (authenticationResult) {
        case -1:
          setWorkspaceName("Invalid workspace");
          break;
        case 0:
          setWorkspaceName("Server error");
          break;
        case 1:
          setWorkspaceName((await getWorkspaceName(URL.id)).name);
          setSuccessfulLoad(true);
          break;
        default:
          setWorkspaceName("Client side error");
      }
    }
    loadWorkspaceData();
  }, []);

  useEffect(() => {
    if (isOverflown(sidebarHeaderRef.current)) {
      setWorkspaceName(workspaceName.substring(0, 11) + "...");
    }
  }, [workspaceName]);

  useEffect(() => {
    async function loadCharts() {
      setCharts((await getChartsDisplay(URL.id)).map(chart => JSON.parse(chart)));
    }
    loadCharts();
  }, [successfulLoad]);

  return (
    <>
      <div className="workspace-container d-flex">
        <Sidebar>
          <div className="sidebar-header justify-content-center d-flex" ref={sidebarHeaderRef}>
            <h4 style={{ width: "fit-content" }}>{workspaceName}</h4>
          </div>
          <SidebarButton label="Charts" image={chart} buttonID={1} />
          <SidebarButton label="Other possible things" buttonID={2} />
        </Sidebar>
        <div className="scrollable d-flex flex-column selection-area">{successfulLoad && <RenderSelection />}</div>
      </div>
    </>
  );



  function RenderSelection() {
    switch (selectedSideButton) {
      case 1:
        return <ChartArea workspaceID={URL.id} charts={charts} setCharts={setCharts} />;
      case 2:
        return <>Smth</>;
      default:
        return <>Unknown option</>;
    }
  }

  function Sidebar(props) {
    return <div className="side-bar">{props.children}</div>;
  }

  function SidebarButton(props) {
    return (
      <button
        className={`side-btn ${selectedSideButton == props.buttonID && "btn-selected"}`}
        onClick={() => {
          setSelectedSideButton(props.buttonID);
        }}
      >
        <img src={props.image || question} className="side-btn-img" width={15} />
        {props.label}
      </button>
    );
  }
}
