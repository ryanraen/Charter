import { useParams } from "react-router-dom"


export default function Workspace() {
  const URL = useParams();
  console.log(URL);
  return <div>{URL.id}</div>
}
