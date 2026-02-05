import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Twitch } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    label: "Home",
    to: '/'
  },
  {
    label: "About",
    to: '/about'
  },
  {
    label: "Contact",
    to: '/contact'
  },
  {
    label: "Get Started",
    to: '/signup'
  }
];

export default function Footer() {
  return (<>
    <div className="flex flex-col p-10 md:flex-row justify-around items-center gap-4"> <div> <Logo /> </div>
      <div className="links flex justify-center">
        {footerLinks.map((elem) => (
          <Button variant="link" asChild key={elem.label}>
            <Link to={elem.to}>{elem.label}</Link>
          </Button>
        ))}
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
