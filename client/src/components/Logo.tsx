import { Link } from "react-router-dom";

export default function Logo() {
  return <>
    <Link to='/'>
      <h1 className="text-lg font-bold">EventX</h1>
    </Link>
  </>;
}
