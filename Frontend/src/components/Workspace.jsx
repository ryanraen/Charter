import { useParams } from "react-router-dom";
import "./css/Workspace.css";
import chart from "../assets/chart.svg";
import question from "../assets/question.svg";
import { useEffect, useRef, useState } from "react";
import { authenticateWorkspace, createChart, getWorkspaceCharts, getWorkspaceData, getWorkspaceName } from "../util/API";
import { getCookie } from "../util/CookieManager";
import { isOverflown } from "../util/Util";
import ChartArea from "./ChartArea";
import Modal from "./Modal";

export default function Workspace() {
  const URL = useParams();

  const [selectedSideButton, setSelectedSideButton] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("Loading...");
  const [successfulLoad, setSuccessfulLoad] = useState(false);
  const sidebarHeaderRef = useRef(null);

  const [charts, setCharts] = useState([]);
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [chartModalErrorMessage, setChartModalErrorMessage] = useState(null);
  const [disableChartModalSubmit, setDisableChartModalSubmit] = useState(false);

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
          updateCharts();
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

  async function updateCharts() {
    setCharts(await getWorkspaceCharts(URL.id));
    setSuccessfulLoad(true);
  }

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
        <div className="padding-space" />
        <div className="d-flex flex-column selection-area">
          {successfulLoad && <RenderSelection />}
        </div>
      </div>
      <Modal
        isOpen={chartModalOpen}
        title={"Create new chart"}
        onClose={() => setChartModalOpen(false)}
        onSubmit={handleChartSubmit}
        submitLabel={"Create"}
        disableSubmit={disableChartModalSubmit}
        errorMessage={chartModalErrorMessage}
        inputs={[
          {
            id: 1,
            name: "name",
            type: "text",
            label: "Chart name",
            placeholder: "Chart name",
            pattern: `^[\\S\\s]+$`,
            errorMessage: "Invalid name",
            required: true,
          },
        ]}
      />
    </>
  );

  async function handleChartSubmit(e) {
    e.preventDefault();
    setDisableChartModalSubmit(true);
    setChartModalErrorMessage(null);

    const formElements = Object.fromEntries(new FormData(e.target));
    try {
      const chartCreationResult = await createChart(URL.id, formElements.name);
      if (chartCreationResult.status == "success") {
        setChartModalOpen(false);
        setCharts(await getWorkspaceCharts(URL.id));
        setDisableChartModalSubmit(false);
      }
    } catch (error) {
      console.log(error);
      setChartModalErrorMessage("Server error, please try again later");
      setDisableChartModalSubmit(false);
    }
  }

  function RenderSelection() {
    switch (selectedSideButton) {
      case 1:
        return <ChartArea charts={charts} openChartModal={() => setChartModalOpen(true)} onItemAdd={() => updateCharts()} />;
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
        <img src={props.image || question} className="side-btn-img" width={20} />
        {props.label}
      </button>
    );
  }
}
