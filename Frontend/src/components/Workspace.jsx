import { useParams } from "react-router-dom";

export default function Workspace() {
  const { id } = useParams();
  return (
    <div>
      <div>
        {id}
      </div>
    </div>
  );
}
