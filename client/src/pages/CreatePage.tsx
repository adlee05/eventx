import EventDetails from "@/components/createEvent/EventDetails";
import EventTiming from "@/components/createEvent/EventTiming";
import EventTiming2 from "@/components/createEvent/EventTiming2";
import {
  FieldSet,
} from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { type formData } from "@/types/formData";

function CreatePage() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<formData>();
  const onSubmit = (data: formData) => {
    console.log(data);
  }

  return <>
    <div className="max-w-4xl md:mx-auto mx-5">
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <span className="">
          <EventDetails register={register} control={control} errors={errors} />
        </span>
        <span className="my-5">
          <EventTiming2 />
        </span>
        <Button type="submit" className="cursor-pointer" onClick={handleSubmit(onSubmit)}>Submit</Button>
      </FieldSet>
    </div>
  </>;
}

export default CreatePage;
