import { EventCard } from "@/components/EventCard";
import { useEffect, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { Filters } from "@/components/Filters";
import { Spinner } from "@/components/ui/spinner";

// types
import type { EventProps } from "@/types/event-props";
import type { FiltersType } from "@/types/events.filter";

function Events() {
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);

  // filter tags 
  const [filters, setFilters] = useState<FiltersType>({
    categories: [] as string[],
    search: "",
    page: 1,
    limit: 12,
    sort: "startDate",
    order: "asc",
  })

  // filter side effect
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/event/allEvents`, {
          withCredentials: true,
          params: {
            category: filters.categories,
            page: filters.page,
            search: filters.search,
            limit: filters.limit,
            sort: filters.sort,
            order: filters.order
          }
        })

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
        setLoading(false);
      }
    }

    getEvents();
  }, [filters, showNotification])

  if (loading) {
    return <div className="flex justify-center">
      <Spinner className="size-10" />
    </div>
  }

  return (
    <>
      <div className="mx-4 sm:mx-auto max-w-5xl my-10">
        <div className="greeting my-10 flex justify-between sm:text-left">
          <div>
            <h1 className="text-lg font-bold">Events</h1>
            <p className="text-base">View all available events</p>
          </div>
          <div>
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-5 sm:gap-y-10 sm:gap-x-10 justify-items-center">
          {events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              _id={event._id}
              description={event.description}
              location={event.location}
              category={event.category}
              imageUrl={event.imageUrl}
              startDate={event.startDate}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
