import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import type { EventType } from "@/types/event-details";
import { Spinner } from "@/components/ui/spinner";

function EventPage() {
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  // event details store
  const [details, setDetails] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // get event id
  const { id } = useParams();

  useEffect(() => {
    const eventDetail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/event/${id}`, { withCredentials: true }
        );

        if (res.data.success) {
          console.log(res.data.data)
          setDetails(res.data.data);
        }
      } catch (e) {
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

    eventDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [id]);

  if (loading) {
    return <><Spinner /></>;
  }

  if (!details) {
    return <p>Event not found!</p>
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1>{details.title}</h1>
      </div>
    </>
  );
}

export default EventPage;
