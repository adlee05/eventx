import EventDetails from "@/components/createEvent/EventDetails";
import EventTiming2 from "@/components/createEvent/EventTiming2";
import {
  FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { type formData } from "@/types/formData";
import { useContext, useState } from "react";
import axios from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { combineDateTime } from "@/utils/combineDateTime";

function CreatePage() {
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm<formData>();
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const [isDisabled, setIsDisabled] = useState(false);


  const onSubmit = async (data: formData) => {
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
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URI}/event/addEvent`, cleanedData, {
        withCredentials: true,
      });

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
    }
  }

  return <>
    <div className="max-w-4xl md:mx-auto mx-5">
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <span className="">
          <EventDetails register={register} control={control} errors={errors} />
        </span>
        <span className="my-5">
          <EventTiming2 register={register} control={control} errors={errors} getValues={getValues} />
        </span>
        <Button type="submit" className="cursor-pointer" disabled={isDisabled} onClick={handleSubmit(onSubmit)}>Submit</Button>
      </FieldSet>
    </div>
  </>;
}

export default CreatePage;
