import "../css/RadioInput.css";

export default function RadioInput(props) {
  return (
    <>
      <input type="radio" className="btn-check " name={props.name} id={props.id} autoComplete="off" defaultChecked={props.default} value={props.value} />
      <label className="btn radio-label" htmlFor={props.id}>
        {props.label}
      </label>
    </>
  );
}
