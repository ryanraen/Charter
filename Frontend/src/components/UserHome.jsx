import "./css/UserHome.css";
import { getCookie } from "../util/CookieManager";
import workspaceIcon from "../assets/workspace.svg";
import plus from "../assets/plus.svg";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { createWorkspace } from "../util/API";

/* 
TODO

- Add fetching all workspaces once backend has it
- Figure out how to actually go to these workspaces in URL
- Consider new spot for 'New workspace'

*/

export default function UserHome() {
  if (getCookie("userID") == null) {
    // TEMP
    location.href = "/";
  }

  const [modalOpen, setModalOpen] = useState(false);

  const keyPressEvent = e => {
    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  async function submitWorkspace(e) {
    e.preventDefault();
    const formElements = Object.fromEntries(new FormData(e.target));

    const workspaceCreationPromise = await createWorkspace(getCookie("userID"), formElements.name, formElements.isPublic);
    setModalOpen(false); // Temp -- Should take you to workspace page
  }

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("keydown", keyPressEvent);
    }

    return () => {
      document.removeEventListener("keydown", keyPressEvent);
    };
  });

  const workspaceTextInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Workspace name",
      placeholder: "Workspace name",
      pattern: `^[\\S\\s]+[\\S]+$`,
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

  const workspaces = [
    {
      id: 1,
      name: "workspace1",
      isPublic: "false",
    },
    {
      id: 6,
      name: "workspace2",
      isPublic: "true",
    },
    {
      id: 5,
      name: "workspace3",
      isPublic: "false",
    },
  ];

  return (
    <>
      <div className="container d-flex">
        <div id="side-bar" className="d-flex flex-column mt-5">
          <SideBarButton label="Workspaces" icon={workspaceIcon}></SideBarButton>
        </div>
        <div className="mt-5 w-100">
          <div className="d-grid align-items-center h-100 w-100" id="workspace">
            <Workspace onClick={() => setModalOpen(true)}>
              <h3>New workspace</h3>
              <img src={plus} alt="" height={25} />
            </Workspace>
            {workspaces.map(workspace => (
              <Workspace key={workspace.id} onClick={() => location.href = `/u/w/${workspace.id}`}>
                <h3>{workspace.name}</h3>
                <h6>{workspace.isPublic === "true" ? "Public" : "Private"}</h6>
              </Workspace>
            ))}
          </div>
        </div>
      </div>
      <Modal
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
    return (
      <div role="button" onClick={props.onClick} className="workspace-box p-2 align-items-center d-flex text-center flex-column justify-content-center user-select-none">
        {props.children}
      </div>
    );
  }
}