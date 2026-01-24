import {Outlet} from "react-router-dom";
import Navbar from "@/components/Navbar.js";

export default function Layout() {
  return <> 
    <Navbar />
    <Outlet />
    <h1>Footer</h1>
  </>;
}
