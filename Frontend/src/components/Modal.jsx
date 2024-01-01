import "./css/Modal.css";
import exit from "../assets/exit.svg";
import FormInput from "./inputs/FormInput";
import RadioInput from "./inputs/RadioInput";
import { useState } from "react";

export default function Modal(props) {
  const handleSubmit = props.onSubmit;

  return (
    <div className={`modal-container w-100 h-100 position-absolute top-0 ${props.isOpen ? "modal-bg" : "pe-none"}`}>
      {props.isOpen && (
        <div className="container modal-content">
          <div className="modal-top-row d-flex flex-row w-100 align-items-center justify-content-between">
            <h5>{props.title}</h5>
            <img className="h-100 exit-icon" role="button" src={exit} width={20} alt="Exit icon/button" onClick={props.onClose} />
          </div>
          <form onSubmit={handleSubmit} className="text-center">
            {props.inputs.map(input => (
              <FormInput key={`text-${input.id}`} {...input} />
            ))}
            <div className="d-flex w-100 justify-content-center">
              {props.radioInputs.map(input => (
                <RadioInput key={`radio${input.id}`} {...input} />
              ))}
            </div>
            {props.errorMessage != "" && <div className="text-danger mb-3">{props.errorMessage}</div>}
            <button className="btn create-btn" type="submit" disabled={props.disableSubmit ? true : false}>
              {props.submitLabel}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
