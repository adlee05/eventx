import EventDetails from "@/components/createEvent/EventDetails";
import EventTiming2 from "@/components/createEvent/EventTiming2";
import {
  FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { type formData } from "@/types/formData";
import combineDateTime from "@/utils/combineDateTime";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

function CreatePage() {
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm<formData>();
  const { userDetails } = useContext(AuthContext);

  const onSubmit = (data: formData) => {
    const cleanedData = {
      title: data.title,
      description: data.description,
      startDate: combineDateTime(data.startDate, data.startTime),
      deadDate: combineDateTime(data.deadDate, data.deadTime),
      category: data.category,
      maxParticipants: data.maxParticipants,
      imageUrl: data.imageUrl,
      createdBy: userDetails?.username
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
        <Button type="submit" className="cursor-pointer" onClick={handleSubmit(onSubmit)}>Submit</Button>
      </FieldSet>
    </div>
  </>;
}

export default CreatePage;
