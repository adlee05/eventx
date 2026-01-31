import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Twitch } from "lucide-react";

export default function Footer() {
  return (<>
    <div className="flex flex-col md:flex-row justify-around items-center gap-4">
      <div> <Logo /> </div>
      <div className="links flex justify-center gap-4">
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/signup'>Get Started</Link>
      </div>
      <div className="socials flex gap-4">
        <Instagram />
        <Twitter />
        <Youtube />
        <Twitch />
      </div>
    </div>
  </>);
}
