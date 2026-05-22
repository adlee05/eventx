import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Controller } from "react-hook-form"
// types
import type { UseFormRegister, Control, FieldErrors } from "react-hook-form"
import type { formData } from "@/types/formData"
type Props = {
  register: UseFormRegister<formData>,
  rhfName0: "startDate" | "deadDate",
  rhfName1: "startTime" | "deadTime",
  control: Control<formData>,
  errors: FieldErrors<formData>
}

export function CalendarWithTime({ register, rhfName0, rhfName1, control, errors }: Props) {
  return (
    <Card size="sm" className="mx-auto w-fit">
      <CardContent>
        <Controller
          name={rhfName0}
          control={control}
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
                  <p className="text-sm text-red-500 mt-2">
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
            <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                {...register(rhfName1, { required: "please select a time" })}
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
