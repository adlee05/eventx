import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.js";
import { Link } from "react-router-dom";

interface ChildProps {
  menuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AvatarComp({ menuOpen }: ChildProps) {
  return <>
    <Link to='/profile/' onClick={() => menuOpen(false)}>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/165539819?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  </>;
}
