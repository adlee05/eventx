import { Link } from "react-router-dom";
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

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            {AuthStatus ?
              <NavbarButton variant="secondary"><AvatarComp /></NavbarButton>
              : <Link to="/login"><NavbarButton variant="primary">Login</NavbarButton></Link>}
            <NavbarButton variant="secondary"><ModeToggle /></NavbarButton>
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
                <NavbarButton variant="secondary"><AvatarComp /></NavbarButton>
                : <Link to="/login"><NavbarButton variant="primary">Login</NavbarButton></Link>}
              <NavbarButton variant="secondary"><ModeToggle /></NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
