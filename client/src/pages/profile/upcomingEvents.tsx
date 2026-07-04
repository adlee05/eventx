import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { useState, useContext, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { type profileEvents } from "@/types/profileEvents";
import { Spinner } from "@/components/ui/spinner";

function UpcomingEvents() {
  // notify context
  const notifyContext = useContext(NotifyContext);

  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }

  const [, showNotification] = notifyContext;

  const [data, setData] = useState<profileEvents[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUpcoming = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/profile/upcoming`, { withCredentials: true });

        if (res.data.data) {
          setData(res.data.data);
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

    getUpcoming();
  }, []);

  if (loading) {
    return <div className="flex justify-center">
      <Spinner className="size-10" />
    </div>
  }

  return <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-5 sm:gap-y-10 sm:gap-x-10 justify-items-center">
      {data?.length == 0 ? <p className="text-center">No upcoming events</p> : data?.map((event, i) => (
        <EventCard
          key={i}
          title={event.eventId.title}
          _id={event.eventId._id}
          description={event.eventId.description}
          location={event.eventId.location}
          category={event.eventId.category}
          imageUrl={event.eventId.imageUrl}
          startDate={event.eventId.startDate}
        />
      ))}
    </div>
  </>;
}

export default UpcomingEvents;
