import {Outlet} from "react-router-dom";
import Navbar from "@/components/Navbar.js";
import Footer from "@/components/footer";

export default function Layout() {
  return <> 
    <Navbar />
    <Outlet />
    <Footer />
  </>;
}
