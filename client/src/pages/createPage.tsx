import { CalendarPlus, CalendarIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { format, addDays } from "date-fns";
import { type DateRange } from "react-day-picker"

function CreatePage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });
  const [open, setOpen] = useState(false)
  console.log(date);
  const [eventDetails, setDetails] = useState({
  });
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)

  return (<>
    <div className="max-w-4xl md:mx-auto mx-5">
      <span className="my-5 flex gap-4 items-center heading">
        <CalendarPlus />
        <h1 className="text-3xl font-semibold"> Create Event</h1>
      </span>
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title" className="text-lg">Title</FieldLabel>
            <Input id="title" type="text" required></Input>
            <FieldDescription>Set a well defined title for your event</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="desc" className="text-lg">Description</FieldLabel>
            <Input id="desc" type="text" required></Input>
            <FieldDescription>Describe your event in detail</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="location" className="text-lg">Location</FieldLabel>
            <Input id="location" type="text" required></Input>
            <FieldDescription>Specify the location of the event in detail</FieldDescription>
          </Field>
          <div className="md:grid-cols-2 grid-cols-1 grid gap-5">
            <Field>
              <FieldLabel htmlFor="imgurl" className="text-lg">Image URL</FieldLabel>
              <Input id="imgurl" type="text" required></Input>
              <FieldDescription>
                Uploading images is not supported yet, I'm working on it to add it in the future.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="maxnums" className="text-lg">Max Participants</FieldLabel>
              <Input id="maxnums" type="number" max={100} min={1} required></Input>
              <FieldDescription>EventX currently supports upto 100 registrations per event.</FieldDescription>
            </Field>
          </div>

          <FieldLabel htmlFor="location" className="text-lg">Select Event Timing</FieldLabel>
          <div className="grid md:grid-cols-3 gap-10 items-end">
            <Field className="w-60">
              <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal"
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field className="w-35">
              <FieldLabel htmlFor="time-picker-optional">Start Time</FieldLabel>
              <Input
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
            <Field className="w-35">
              <FieldLabel htmlFor="time-picker-optional">End Time</FieldLabel>
              <Input
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </div>

          <FieldLabel htmlFor="date-picker-optional" className="text-lg my-3">Registration Deadline</FieldLabel>
          <div className="flex  gap-10">
            <Field className="w-32">
              <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-optional"
                    className="w-32 justify-between font-normal"
                  >
                    {deadline ? format(deadline, "PPP") : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    captionLayout="dropdown"
                    defaultMonth={deadline}
                    onSelect={(deadline) => {
                      setDeadline(deadline)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field className="w-35">
              <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
              <Input
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="10:30:00"
                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  </>);
}

export default CreatePage;
