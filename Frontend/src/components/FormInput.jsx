export default function FormInput(props) {
  return (
    <div className="form-floating">
      <input name={props.formID} type={props.type} className="form-control" required={props.required} placeholder={props.text} id={props.formID} autoComplete={props.autoComplete ? "true" : "false"}/>
      <label htmlFor={props.formID}>{props.text}</label>
    </div>
  );
}
