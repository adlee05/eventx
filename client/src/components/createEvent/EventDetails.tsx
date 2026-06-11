import {
  BookA,
  Captions,
  MapPinPlusInside,
  Link,
  UsersRound,
  ChartBarStacked
} from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type UseFormRegister, type Control, Controller, type FieldErrors } from "react-hook-form";
import { type formData } from "@/types/formData";

type Props = {
  register: UseFormRegister<formData>;
  control: Control<formData>;
  errors: FieldErrors<formData>;
};

function EventDetails({ register, control, errors }: Props) {

  return (
    <>
      <h1 className="text-2xl font-semibold text-amber-500 heading mb-5 text-center">Event Details</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title" className="text-lg"><BookA /> Title</FieldLabel>
          <Input id="title" type="text" maxLength={50}  {...register("title", { required: "Title is required" })}></Input>
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          <FieldDescription>Set a well defined title for your event</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="desc" className="text-lg"><Captions /> Description</FieldLabel>
          <Input id="desc" type="text" maxLength={250} required {...register("desc", { required: "Description of the event is required" })}></Input>
          {errors.desc && <span className="text-red-500 text-sm">{errors.desc.message}</span>}
          <FieldDescription>Describe your event in detail</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="location" className="text-lg"><MapPinPlusInside /> Location</FieldLabel>
          <Input id="location" type="text" required {...register("location", { required: "Specifying location is a must." })}></Input>
          {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
          <FieldDescription>Specify the location of the event in detail</FieldDescription>
        </Field>
        <div className="md:grid-cols-2 grid-cols-1 grid gap-5">
          <Field>
            <FieldLabel htmlFor="imgurl" className="text-lg"><Link /> Image URL</FieldLabel>
            <Input id="imgurl" type="text" required {...register("imgurl")}></Input>
            <FieldDescription>
              Uploading images is not supported yet, I'm working on it to add it in the future.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="maxnums" className="text-lg"><UsersRound /> Max Participants</FieldLabel>
            <Input id="maxnums" defaultValue={100} type="number" max={100} min={1} required {...register("maxnums")}></Input>
            <FieldDescription>Max 100 Participants. Not specifying this will set the limit to 100</FieldDescription>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="category" className="text-lg"><ChartBarStacked /> Category</FieldLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Selecting a category is mandatory" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="recreational">Recreational</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
          <FieldDescription>Selecting the correct category will help you find the correct audience for your event.</FieldDescription>
        </Field>
      </FieldGroup >


    </>
  );
}

export default EventDetails;
