import "./css/UserHome.css";
import { getCookie } from "../util/CookieManager";
import workspaceIcon from "../assets/workspace.svg";
import plus from "../assets/plus.svg";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { getAllUserWorkspaces, getWorkspacesDisplay } from "../util/API";

/* 
TODO

- Consider new spot for 'New workspace'

*/

export default function UserHome() {
  if (getCookie("userID") == null) {
    return <></>;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [disableModalSubmit, setDisableModalSubmit] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);

  const keyPressEvent = e => {
    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  async function submitWorkspace(e) {
    e.preventDefault();
    setDisableModalSubmit(true);
    console.log(await getWorkspaceIsPublic(1));
    setDisableModalSubmit(false);
    // const formElements = Object.fromEntries(new FormData(e.target));

    // const workspaceCreationPromise = await createWorkspace(getCookie("userID"), formElements.name, formElements.isPublic);
    // if (workspaceCreationPromise.status == "success") {
    //   location.href = `/u/w/${workspaceCreationPromise.id}`;
    // }
  }

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("keydown", keyPressEvent);
    }

    async function updateWorkspaces() {
      console.log("getting");
      const workspacesString = await getWorkspacesDisplay(getCookie("userID"));
      // const workspacesJSON = STUFF
      setWorkspaces(workspacesJSON);
    }

    updateWorkspaces();

    return () => {
      document.removeEventListener("keydown", keyPressEvent);
    };
  }, []);

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
              <Workspace key={JSON.parse(workspace).id} onClick={() => (location.href = `/u/w/${JSON.parse(workspace)}`)}>
                <h3>{JSON.parse(workspace).name}</h3>
                <h6>{JSON.parse(workspace).isPublic === "true" ? "Public" : "Private"}</h6>
              </Workspace>
            ))}
          </div>
        </div>
      </div>
      <Modal
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
    return (
      <div role="button" onClick={props.onClick} className="workspace-box p-2 align-items-center d-flex text-center flex-column justify-content-center user-select-none">
        {props.children}
      </div>
    );
  }
}
