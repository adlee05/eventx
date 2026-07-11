import EventDetails from "@/components/createEvent/EventDetails";
import EventTiming2 from "@/components/createEvent/EventTiming2";
import {
  FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { type formData } from "@/types/formData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { combineDateTime } from "@/utils/combineDateTime";
import { type EventType } from "../types/event-details.ts";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner.tsx";
import { dateAndTime } from "@/utils/splitDateTime.ts";
import { AuthContext } from "@/context/AuthContext.ts";

function EditPage() {
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const { userDetails } = useContext(AuthContext);

  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<EventType | undefined>();

  const { id } = useParams();

  const { register, handleSubmit, control, formState: { errors }, getValues, reset } = useForm<formData>({
    defaultValues: {}
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/event/${id}`, { withCredentials: true }
        );

        if (res.data.success) {
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

    getDetails();
  }, [id, showNotification]);

  useEffect(() => {
    if (details) {
      reset(
        {
          title: details.title,
          description: details?.description,
          category: details?.category,
          maxParticipants: details?.maxParticipants,
          imageUrl: details?.imageUrl,
          location: details?.location,
          startDate: details?.startDate,
          deadDate: details?.deadDate,
          startTime: dateAndTime(details.startDate).time,
          deadTime: dateAndTime(details.deadDate).time
        }
      );
    }
  }, [details, reset])

  if (details && details.createdBy !== userDetails?.userId) {
    return <p className="text-center">Not Permitted!</p>
  }

  if (loading) {
    return <div className="mx-auto flex justify-center">
      <Spinner />
    </div>;
  }

  if (!details) {
    return <p className="text-center">Event not found!</p>
  }

  const onSubmit = async (data: formData) => {
    setIsDisabled(true);

    const cleanedData = {
      data: {
        title: data.title,
        description: data.description,
        startDate: combineDateTime(data.startDate, data.startTime),
        deadDate: combineDateTime(data.deadDate, data.deadTime),
        category: data.category,
        maxParticipants: data.maxParticipants,
        imageUrl: data.imageUrl,
        location: data.location
      }
    }

    try {
      const result = await axios.patch(`${import.meta.env.VITE_SERVER_URI}`, cleanedData.data, { withCredentials: true });

      if (result.data.success) {
        showNotification({
          type: "success",
          title: "Event Saved Successfully",
          desc: result.data.message
        })

        setIsDisabled(true);
      } else {
        showNotification({
          type: "failure",
          title: "Error in saving event",
          desc: result.data.message
        })
      }
    } catch (e) {
      console.error(e);

      if (axios.isAxiosError(e)) {
        showNotification({
          type: "failure",
          title: "Error in saving event",
          desc: e.response?.data?.message
        })
      } else {
        showNotification({
          type: "failure",
          title: "Unexpected error",
          desc: String(e)
        })
      }
    } finally {
      setIsDisabled(false);
    }
  }

  return <>
    <div className="max-w-4xl md:mx-auto mx-5 flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-center">Edit Event Details</h1>
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <span className="">
          <EventDetails register={register} control={control} errors={errors} mode="edit" participants={details.registrationCount} />
        </span>
        <span className="my-5">
          <EventTiming2 register={register} control={control} errors={errors} getValues={getValues} />
        </span>
        <Button type="submit" className="cursor-pointer" disabled={isDisabled} onClick={handleSubmit(onSubmit)}>Edit Event</Button>
      </FieldSet>
    </div>
  </>;
}

export default EditPage;
