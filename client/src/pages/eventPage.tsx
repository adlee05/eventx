import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import type { EventType } from "@/types/event-details";
import { Spinner } from "@/components/ui/spinner";
import { IconClockHour3 } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { getDateTime } from "@/utils/getDateTime";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EventSettings } from "@/components/eventSettings";
import { AuthContext } from "@/context/AuthContext";
import { ConfirmDelete } from "@/components/ConfirmDelete";

function EventPage() {
  // badges
  const categoryColors: Record<string, string> = {
    tech: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3",
    recreational: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 mb-3",
    art: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-3",
    archived: "bg-red-100 text-red-700 dark:bg-white dark:text-red-700 mb-3",
  }

  // get user details 
  const { userDetails } = useContext(AuthContext);

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  // prevent constant registers
  const [isSubmitting, setIsSubmitting] = useState(false);

  // event details store
  const [details, setDetails] = useState<EventType | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  // get event id
  const { id } = useParams();

  // registrations states
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participantsLoaded, setParticipantsLoaded] = useState(false);

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

  const handleRegister = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!details?.registered) {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/event/register`, {
          eventId: id
        }, {
          withCredentials: true,
        });

        if (res.data.success) {
          showNotification({
            title: "Registered Succesfully",
            desc: "You have succesfully registered",
            type: "success"
          })

          setDetails((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              registered: true,
              registrationCount: res.data.data.registrationCount
            }
          })
        }
      } else {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER_URI}/event/deleteRegistration`,
          {
            data: {
              eventId: id,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          showNotification({
            title: "Unregistered Succesfully",
            desc: res.data.message,
            type: "success"
          })

          setDetails((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              registered: false,
              registrationCount: res.data.data.registrationCount
            }
          })
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          title: "Error Registering for Events",
          desc: e.response?.data?.message,
          type: "failure"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // to get registrations
  const handleViewRegistrations = async () => {
    const next = !showRegistrations;

    setShowRegistrations(next);

    if (next && !participantsLoaded) {
      try {
        setParticipantsLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/event/${id}/registrations`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setParticipants(res.data.data);
          setParticipantsLoaded(true);
        }
      } catch (e) {
        console.error(e);

        if (e instanceof AxiosError) {
          showNotification({
            title: "Unable to fetch registrations",
            desc: e.response?.data?.message,
            type: "failure",
          });
        }
      } finally {
        setParticipantsLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="mx-auto flex justify-center">
      <Spinner />
    </div>;
  }

  if (!details) {
    return <p className="text-center">Event not found!</p>
  }

  // check if its appropriate to register
  const now = new Date();
  const hasExpired =
    new Date(details.startDate) < now ||
    new Date(details.deadDate) < now;

  const imgUrl = (
    details.imageUrl == "" ? "https://images.pexels.com/photos/17415163/pexels-photo-17415163.jpeg" : details.imageUrl
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Hero Image */}
      <img
        src={`${imgUrl}?w=1200`}
        alt="Event"
        className="w-full h-[260px] md:h-[360px] rounded-2xl object-cover"
      />

      <div className="grid md:grid-cols-[2fr_1fr] gap-10 mt-8">
        {/* Left Section */}
        <div>
          <div className="flex gap-4">
            <Badge className={categoryColors[details.category]}>
              {details.category}
            </Badge>

            {details.archived ?
              <Badge className={categoryColors["archived"]}>
                archived
              </Badge> : ""
            }
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {details.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-5 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{details.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <IconClockHour3 size={18} />
              <span>{getDateTime(details.startDate)}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="text-muted-foreground">Hosted by</span>

            <Button
              variant="link"
              className="px-0 h-auto text-base font-semibold"
            >
              {details.createdByUname}
            </Button>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              About this event
            </h2>

            <p className="leading-8 text-muted-foreground whitespace-pre-line">
              {details.description}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div className="flex flex-col gap-4">
          {userDetails?.userId == details.createdBy ?
            <EventSettings isArchived={details.archived} eventId={id} setDetails={setDetails} onViewRegistrations={handleViewRegistrations} /> : ""
          }
          <Card className="sticky top-24 rounded-2xl">
            <CardContent className="p-6 space-y-6">
              {hasExpired || (details.archived && !details.registered) ?
                <p className="text-red-600 font-semibold">
                  Registrations are closed for this event
                </p> :
                <div className="flex flex-col gap-7">

                  <Button
                    className="w-full cursor-pointer"
                    disabled={isSubmitting ||
                      (!details.registered && details.registrationCount == details.maxParticipants)
                    }
                    onClick={handleRegister}
                  >
                    {isSubmitting ? (
                      <Spinner />
                    ) : details.registered ? (
                      "Unregister"
                    ) : (
                      "Register"
                    )}
                  </Button>

                  <Separator />

                  {/* Seats */}

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Seats</span>

                      <span>
                        {details.registrationCount} / {details.maxParticipants}
                      </span>
                    </div>

                    <Progress
                      value={
                        (details.registrationCount /
                          details.maxParticipants) *
                        100
                      }
                    />

                    <p className="text-center text-sm text-muted-foreground">
                      {details.maxParticipants -
                        details.registrationCount}{" "}
                      seats remaining
                    </p>
                  </div>

                  <Separator />


                </div>

              }
              {/* Event Details */}
              <div className="space-y-5">

                <div className="flex gap-4">
                  <Calendar className="w-5 h-5 mt-1 text-primary" />

                  <div>
                    <p className="font-medium">
                      Starts
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {getDateTime(details.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-5 h-5 mt-1 text-primary" />

                  <div>
                    <p className="font-medium">
                      Registration closes
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {getDateTime(details.deadDate)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />

                  <div>
                    <p className="font-medium">
                      Venue
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {details.location}
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* toggle registrations div */}
      {showRegistrations && (
        <div className="mt-12">
          <Separator className="mb-8" />

          <h2 className="text-3xl font-bold mb-6">
            Registrations ({participants.length})
          </h2>

          {participantsLoading ? (
            <Spinner />
          ) : (
            <div>
              {participants.map((participant: any) => (
                <Card key={participant.id} className="mb-3">
                  <CardContent className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{participant.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {participant.email}
                      </p>
                    </div>
                    <ConfirmDelete userId={participant.id} id={id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventPage;
