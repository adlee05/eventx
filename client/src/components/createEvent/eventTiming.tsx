import {
  CalendarIcon,
  ChevronDownIcon,
  Clock8,
  ClipboardClock,
} from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { format, addDays } from "date-fns";
import { type DateRange } from "react-day-picker"

function EventTiming() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });
  const [open, setOpen] = useState(false)
  console.log(date);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)

  return (<>
    <h1 className="text-2xl font-semibold text-amber-500 heading">Event Timing</h1>
    <FieldGroup>
      <FieldLabel htmlFor="event-timing" className="text-lg"><Clock8 /> Select Event Timing</FieldLabel>
      <div className="grid md:grid-cols-3 gap-10 items-end">
        <Field className="w-60">
          <FieldLabel htmlFor="date-picker-range">Event Timeline Date</FieldLabel>
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
                      {format(date.from, "LLL dd, y")} - {" "}
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

      <FieldLabel htmlFor="deadline" className="text-lg my-3"><ClipboardClock /> Registration Deadline</FieldLabel>
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
  </>);
}

export default EventTiming;
