import { CalendarWithTime } from "@/components/StartTimePicker";
import type { formData } from "@/types/formData";
import { type UseFormRegister, type Control, type FieldErrors, type UseFormGetValues } from "react-hook-form";

type Props = {
  register: UseFormRegister<formData>,
  control: Control<formData>,
  errors: FieldErrors<formData>,
  getValues: UseFormGetValues<formData>
}

function EventTiming2({ register, control, getValues }: Props) {
  return <div className="md:flex justify-around">
    <div className="mb-5">
      <h1 className="text-2xl font-semibold text-amber-500 heading text-center mb-5">Event Timing</h1>
      <CalendarWithTime register={register} rhfName1="startTime" rhfName0="startDate" control={control} getValues={getValues} />
    </div>
    <div className="mb-5">
      <h1 className="text-2xl font-semibold text-amber-500 heading text-center mb-5">Event Registration Deadline</h1>
      <CalendarWithTime register={register} rhfName1="deadTime" rhfName0="deadDate" control={control} getValues={getValues} />
    </div>
  </div>;
}

export default EventTiming2;
