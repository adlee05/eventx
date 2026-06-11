import { useState } from "react";

function Component1() {
  const [name, setName] = useState("");

  return <> 
  <input type='text' onChange={(event) => {
    setName(event.target.value)
  }} />

  <h1>{name}</h1>
  </>;
}

export default Component1;
