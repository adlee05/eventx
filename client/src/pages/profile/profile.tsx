import { Button } from "../../components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const menuOptions = [
  {
    id: 1,
    label: "Profile",
    to: '/profile/',
    url: 'profile'
  },
  {
    id: 3,
    label: "Upcoming Events",
    to: '/profile/upcomingEvents',
    url: 'upcomingEvents'
  },
  {
    id: 4,
    label: "Past Events",
    to: '/profile/pastEvents',
    url: 'pastEvents'
  }
]

function Profile() {
  const location = useLocation();

  const { userDetails } = useContext(AuthContext);

  return (<>
    <div className="max-w-4xl mx-auto my-5 px-4">
      <div className="greetings text-center flex flex-col gap-4">
        <h1 className="text-4xl">Welcome, {userDetails?.username}</h1>
        <h1 className="text-xl">Check your account status here</h1>
      </div>

      <div className="buttonArray overflow-x-auto my-10">
        <div className="flex gap-4 min-w-max px-4 justify-center">
          {menuOptions.map((elem) => (
            <Button
              variant={location.pathname === elem.to ? "default" : "ghost"}
              asChild
              key={elem.id}
            >
              <Link to={elem.to}>{elem.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  </>);
}

export default Profile;
