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

function EventDetails() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-amber-500 heading">Event Details</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title" className="text-lg"><BookA /> Title</FieldLabel>
          <Input id="title" type="text" required></Input>
          <FieldDescription>Set a well defined title for your event</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="desc" className="text-lg"><Captions /> Description</FieldLabel>
          <Input id="desc" type="text" required></Input>
          <FieldDescription>Describe your event in detail</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="location" className="text-lg"><MapPinPlusInside /> Location</FieldLabel>
          <Input id="location" type="text" required></Input>
          <FieldDescription>Specify the location of the event in detail</FieldDescription>
        </Field>
        <div className="md:grid-cols-2 grid-cols-1 grid gap-5">
          <Field>
            <FieldLabel htmlFor="imgurl" className="text-lg"><Link /> Image URL</FieldLabel>
            <Input id="imgurl" type="text" required></Input>
            <FieldDescription>
              Uploading images is not supported yet, I'm working on it to add it in the future.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="maxnums" className="text-lg"><UsersRound /> Max Participants</FieldLabel>
            <Input id="maxnums" type="number" max={100} min={1} required></Input>
            <FieldDescription>EventX currently supports upto 100 registrations per event.</FieldDescription>
          </Field>
        </div>

        <FieldLabel htmlFor="category" className="text-lg"><ChartBarStacked /> Category</FieldLabel>
        <Select>
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
      </FieldGroup>

    </>
  );
}

export default EventDetails;
