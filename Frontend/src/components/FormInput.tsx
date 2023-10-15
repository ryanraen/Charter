export default function FormInput(props: any) {
  return (
    <div className="form-floating">
      <input name={props.objectID} type={props.type} className="form-control" required={props.required} placeholder={props.text} id={props.objectID} autoComplete={props.autoComplete ? "true" : "false"}/>
      <label htmlFor={props.objectID}>{props.text}</label>
    </div>
  );
}
