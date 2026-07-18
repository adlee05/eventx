import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { combineDateTime } from "@/utils/combineDateTime"
import { Controller } from "react-hook-form"

// types
import type { UseFormRegister, Control, UseFormGetValues } from "react-hook-form"
import type { formData } from "@/types/formData"
type Props = {
  register: UseFormRegister<formData>,
  rhfName0: "startDate" | "deadDate",
  rhfName1: "startTime" | "deadTime",
  control: Control<formData>,
  getValues: UseFormGetValues<formData>
}

export function CalendarWithTime({ register, rhfName0, rhfName1, control, getValues }: Props) {
  // timing validation function
  const dateValidate = () => {
    const startTime = combineDateTime(getValues('startDate'), getValues('startTime'));
    const deadTime = combineDateTime(getValues('deadDate'), getValues('deadTime'));

    const now = new Date();

    if (!startTime || !deadTime)
      return "Invalid time values";

    if (startTime <= deadTime)
      return "Event cannot start before its registartion deadline, you dumbo.";

    if (startTime < now || deadTime < now)
      return "Events cannot start in the past.";

    return true;
  };

  return (
    <Card className="mx-auto max-w-sm w-fit">
      <CardContent>
        <Controller
          name={rhfName0}
          control={control}
          rules={{
            required: "Select a Date!",
            validate: dateValidate
          }}
          render={
            ({ field, fieldState }) => (
              <div>
                < Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="p-0"
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2 max-w-full">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )
          }
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">{rhfName0 == "startDate" ? "Start Time" : "Deadline"}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                {...register(rhfName1)}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
