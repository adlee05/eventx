import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ModeToggle } from "@/components/modeToggle";
import AvatarComp from "@/components/AvatarComp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NavbarComp() {
  const { AuthStatus } = useContext(AuthContext);
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Events",
      link: "/events",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative w-full z-100">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            {AuthStatus ?
              <div className="flex items-center">
                <NavbarButton variant="secondary"><AvatarComp /></NavbarButton>
                <NavbarButton variant="secondary">
                  <Link to='/event/create'>
                    <Button variant="outline" className="cursor-pointer"><Plus /> Create Event</Button>
                  </Link>
                </NavbarButton>
              </div>
              : <Link to="/login"><NavbarButton variant="primary">Login</NavbarButton></Link>}
            {location.pathname != '/' && <NavbarButton variant="secondary"><ModeToggle /></NavbarButton>}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              {AuthStatus ?
                <div className="flex flex-col gap-2">
                  <NavbarButton variant="secondary"><AvatarComp /></NavbarButton>
                  <Button variant="outline"><Plus /> Create Event</Button>
                </div> : <Link to="/login"><NavbarButton variant="primary">Login</NavbarButton></Link>}
              {location.pathname != '/' && <NavbarButton variant="secondary"><ModeToggle /></NavbarButton>}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
