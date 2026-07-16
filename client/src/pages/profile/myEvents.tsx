import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { type EventProps } from "@/types/event-props";
import { Spinner } from "@/components/ui/spinner";
import { EventCard } from "@/components/EventCard";

function MyEvents() {
  const notifyContext = useContext(NotifyContext);

  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }

  const [, showNotification] = notifyContext;
  const [myEvents, setMyEvents] = useState<EventProps[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/profile/myEvents`, { withCredentials: true });

        if (res.data.success) {
          setMyEvents(res.data.data);
        } else {
          showNotification({
            title: "Unable to fetch events",
            desc: res.data.message,
            type: "failure"
          })
        }
      } catch (e) {
        console.error(e);

        if (e instanceof AxiosError) {
          showNotification({
            title: "Error Fetching Event Details",
            desc: e.response?.data?.message,
            type: "failure"
          });
        }
      } finally {
        setLoading(false);
      }
    }

    getMyEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center">
      <Spinner className="size-10" />
    </div>
  }

  return <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-5 sm:gap-y-10 sm:gap-x-10 justify-items-center">
      {myEvents?.length == 0 ? <p> You haven't created any events yet </p> :
        myEvents?.map((event, i) => (
          <EventCard
            key={i}
            title={event.title}
            _id={event._id}
            description={event.description}
            location={event.location}
            category={event.category}
            imageUrl={event.imageUrl}
            startDate={event.startDate}
            archived={event.archived}
          />
        ))
      }
    </div>

  </>;
}

export default MyEvents;
