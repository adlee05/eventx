import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.js";
import {Link} from "react-router-dom";

export default function AvatarComp() {
  return <>
    <Link to='/profile'>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/165539819?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  </>;
}
