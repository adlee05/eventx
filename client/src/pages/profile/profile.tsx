import { Button } from "@/components/ui/button"
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const menuOptions = [
  {
    id: 1,
    label: "Profile",
    to: '/profile/'
  },
  {
    id: 2,
    label: "Saved Events",
    to: '/profile/savedEvents'
  },
  {
    id: 3,
    label: "Upcoming Events",
    to: '/profile/upcomingEvents'
  },
  {
    id: 4,
    label: "Past Events",
    to: '/profile/pastEvents'
  }
]

// <Button variant="ghost" className="cursor-pointer">Details</Button>
//         <Button variant="ghost">Saved Events</Button>
//         <Button variant="ghost">Upcoming Events</Button>
//         <Button>Attended Events</Button>

function Profile() {
  const [selected, setSelected] = useState(1);
  const handleClick = (id: number) => {
    setSelected(id);
  };
  const { username } = useContext(AuthContext);
  return (<>
    <div className="max-w-4xl mx-auto my-5 px-4">
      <div className="greetings text-center flex flex-col gap-4">
        <h1 className="text-4xl">Welcome, {username}</h1>
        <h1 className="text-xl">Check your account status here</h1>
      </div>

      <div className="buttonArray overflow-x-auto my-10">
        <div className="flex gap-4 min-w-max px-4 justify-center">
          {menuOptions.map((elem) => (
            <Button
              variant={selected === elem.id ? "default" : "ghost"}
              asChild
              key={elem.id}
              onClick={() => handleClick(elem.id)}
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
