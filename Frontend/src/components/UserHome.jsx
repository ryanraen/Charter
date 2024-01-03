import "./css/UserHome.css";
import { getCookie } from "../util/CookieManager";
import workspaceIcon from "../assets/workspace.svg";
import plus from "../assets/plus.svg";
import { useEffect, useState, useRef } from "react";
import Modal from "./Modal";
import { createWorkspace, getWorkspacesDisplay } from "../util/API";

export default function UserHome() {
  if (getCookie("userID") == null) {
    return;
  }

  const defaultWorkspace = [{ name: "Loading...", id: "-2", isPublic: "Please wait" }];

  const [modalOpen, setModalOpen] = useState(false);
  const [disableModalSubmit, setDisableModalSubmit] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const [workspaces, setWorkspaces] = useState(defaultWorkspace);

  const keyPressEvent = e => {
    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  async function submitWorkspace(e) {
    e.preventDefault();
    setDisableModalSubmit(true);

    const formElements = Object.fromEntries(new FormData(e.target));
    try {
      const workspaceCreationJ = await createWorkspace(getCookie("userID"), formElements.name, formElements.isPublic);
      if (workspaceCreationJ.status == "success") {
        location.href = `/u/w/${workspaceCreationJ.id}`;
      }
    } catch (error) {
      setModalErrorMessage("Server error, please try again later");
      setDisableModalSubmit(false);
    }
  }

  async function updateWorkspaces() {
    try {
      const workspacesString = await getWorkspacesDisplay(getCookie("userID"));
      const workspacesJSON = workspacesString.map(string => JSON.parse(string));
      setWorkspaces(workspacesJSON);
    } catch (error) {
      setWorkspaces([{ name: "Server error", id: "-2", isPublic: "Please try again later" }]);
      console.log(error);
    }
  }

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("keydown", keyPressEvent);
    }

    return () => {
      document.removeEventListener("keydown", keyPressEvent);
    };
  }, []);

  useEffect(() => {
    updateWorkspaces();
  }, []);

  const workspaceTextInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Workspace name",
      placeholder: "Workspace name",
      pattern: `^[\\S\\s]+$`,
      errorMessage: "Invalid name",
      required: true,
    },
  ];

  const workspaceRadioInputs = [
    {
      id: `r1`,
      name: "isPublic",
      label: "Public",
      value: "true",
      default: "true",
    },
    {
      id: `r2`,
      name: "isPublic",
      label: "Private",
      value: "false",
    },
  ];

  return (
    <>
      <div className="container d-flex">
        <div id="side-bar" className="d-flex flex-column mt-5">
          <SideBarButton label="Workspaces" icon={workspaceIcon}></SideBarButton>
        </div>
        <div className="mt-5 w-100 container">
          <div className="d-grid align-items-center h-100 w-100" id="workspace">
            <Workspace title={"New Workspace"} id={-1} onClick={() => setModalOpen(true)}>
              <img src={plus} alt="" height={25} />
            </Workspace>
            {workspaces.toReversed().map(workspace => (
              <Workspace isPublic={workspace.isPublic} title={workspace.name} key={workspace.id} onClick={workspace.id >= 0 ? () => (location.href = `/u/w/${workspace.id}`) : null}></Workspace>
            ))}
          </div>
        </div>
      </div>
      <Modal
        errorMessage={modalErrorMessage}
        disableSubmit={disableModalSubmit}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        inputs={workspaceTextInputs}
        radioInputs={workspaceRadioInputs}
        title={"Create new workspace"}
        submitLabel={"Create"}
        onSubmit={submitWorkspace}
      />
    </>
  );

  function SideBarButton(props) {
    return (
      <button className="btn side-bar-btn text-start d-flex align-items-center gap-3" onClick={props.onClick}>
        <img src={props.icon} height={20} alt="" className="side-button-icon" />
        {props.label}
      </button>
    );
  }

  function Workspace(props) {

    function isOverflown(element) {
      return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

    const titleRefDiv = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
      if (isOverflown(titleRefDiv.current)) {
        titleRef.current.innerText = titleRef.current.innerText.substring(0, 25).trim() + "...";
      }
    }, [titleRef.current])
    
    return (
      <div role="button" onClick={props.onClick} className="workspace-box p-2 align-items-center d-flex text-center flex-column justify-content-center user-select-none">
        <div ref={titleRefDiv} className="workspace-title d-flex align-items-center justify-content-center">
          <h3 ref={titleRef}>{props.title}</h3>
        </div>
        <div className="workspace-privacy">
          <h6>{props.isPublic === "true" ? "Public" : props.isPublic === "false" ? "Private" : props.isPublic}</h6>
        </div>
        {props.children}
      </div>
    );
  }
}
