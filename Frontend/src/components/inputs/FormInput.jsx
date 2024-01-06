import { useState } from "react";
import "../css/FormInput.css";

export default function FormInput(props) {
  const {label, onChange, id, errorMessage, additionalClass, ...inputProps} = props;

  const [focused, setFocused] = useState(true);
  return (
    <div className={`form-floating ${additionalClass}`}>
      <input className="form-control"  {...inputProps} id={props.id} onChange={onChange} onBlur={() => setFocused(false)} />
      <label htmlFor={props.id}>{props.label}</label>
      {!focused && <span className="text-danger d-none errorMessage">{props.errorMessage}</span>}
    </div>
  );
}