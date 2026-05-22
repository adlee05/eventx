import { useParams } from "react-router-dom";

function UserPage() {
  const { id } = useParams();

  return <>
    Username is {id}
  </>;
}

export default UserPage;
