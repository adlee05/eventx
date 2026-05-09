import EventDetails from "@/components/createEvent/eventDetails";
import EventTiming from "@/components/createEvent/eventTiming";
import {
  FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { type formData } from "@/types/formData";

function CreatePage() {
  const { register, handleSubmit, control, setValue } = useForm<formData>();
  const onSubmit = (data: formData) => {
    console.log(data);
  }

  return <>
    <div className="max-w-4xl md:mx-auto mx-5">
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <EventDetails register={register} control={control} />
        <span className="my-5">
          <EventTiming register={register} setValue={setValue} />
        </span>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
      </FieldSet>
    </div>
  </>;
}

export default CreatePage;
