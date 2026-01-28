import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Notify from "@/components/notification";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { EventCard } from "@/components/EventCard.jsx";

// types
import type { notifyProp } from "@/types/notification";

function Home() {
  const { setAuthStatus } = useContext(AuthContext);
  const [npProps, setNpProps] = useState<notifyProp>({
    title: "",
    description: "",
    type: "failure",
    isActive: false,
  });

  useEffect(() => {
    if (!npProps.isActive) return;

    const timer = setTimeout(() => {
      setNpProps((prev: notifyProp) => ({
        ...prev,
        isActive: false,
      }))
    }, 3000);

    return () => clearTimeout(timer);
  }, [npProps.isActive]);

  // logout handler
  async function handleLogout() {
    try {
      const res = await axios.get('http://localhost:5000/auth/logout', {
        withCredentials: true,
      });

      if (res.data.success) {
        setAuthStatus(false);
      }
    } catch {
      setNpProps({
        title: "Error",
        description: "Error logging out",
        type: "failure",
        isActive: true,
      })
    }
    console.log('action performed');

  }

  return (<>
    <Notify
      title={npProps.title}
      type={npProps.type}
      description={npProps.description}
      isActive={npProps.isActive}
    />
    The Home Page
    <Button onClick={handleLogout}>Logout</Button>
  </>);
}

export default Home;
