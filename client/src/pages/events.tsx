import { EventCard } from "@/components/EventCard";
import { useEffect, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";

// types
import type { EventProps } from "@/types/event-props";

export default function Events() {
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/event/allEvents`, {withCredentials: true}
        );

        setEvents(res.data.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          showNotification({
            title: "Error Fetching Events",
            desc: e.response?.data?.message,
            type: "failure"
          });
        }
      } finally {
        setLoading(false); // stop loading no matter what
      }
    };

    fetchEvents();
  }, [showNotification]);

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <>
      <div className="mx-4 sm:mx-auto max-w-5xl my-10">
        <div className="greeting my-10 text-center sm:text-left">
          <h1 className="text-lg font-bold">Events</h1>
          <p className="text-base">View all available events</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12 justify-items-center">
          {events.map((event, i) => (
            <EventCard
              key={i}
              _id={event._id}
              date={event.date}
              duration="4hrs"
              location={event.location}
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
