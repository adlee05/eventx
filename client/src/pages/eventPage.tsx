import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import type { EventType } from "@/types/event-details";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "@/utils/formatDate";
import { IconClockHour3 } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import getTime from "@/utils/getTime.js";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { AuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom"

function EventPage() {
  // badges
  const categoryColors: Record<string, string> = {
    tech: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3",
    recreational: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 mb-3",
    art: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-3",
  }

  // get username
  const { userDetails } = useContext(AuthContext);
  const userLink = `/users/${userDetails?.username}`;

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
    return <div className="mx-auto flex justify-center">
      <Spinner />
    </div>;
  }

  if (!details) {
    return <p className="text-center">Event not found!</p>
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-5 md:px-0">
      <img
        src={`${details.imageUrl}?w=1200`}
        alt="Event Image"
        className="w-full h-[350px] md:h-[420px] object-cover rounded-xl"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">

        <div>
          <Badge className={categoryColors[details.category]}>
            {details.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-semibold">
            {details.title}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <IconClockHour3 size={18} />
            <span>{formatDate(details.startTime)}</span>
            <span>•</span>
            <span>{details.location}</span>
          </div>
          <div className="created-by flex items-center">
            <p className="font-semibold">Event by</p>
            <Link to={userLink}>
              <Button variant="link" className="cursor-pointer">
                {userDetails?.username}
              </Button>
            </Link>
          </div>
        </div>

        <Button className="md:w-auto w-full cursor-pointer">
          Register
        </Button>

      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-10 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Details
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            {details.description}
          </p>
        </div>

        <div className="p-6 border rounded-xl bg-card space-y-5 h-fit">

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(details.startTime)} – {formatDate(details.endTime)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-lg font-semibold">
            <Clock className="w-4 h-4" />
            <span>
              {getTime(details.startTime)} – {getTime(details.endTime)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{details.location}</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EventPage;
