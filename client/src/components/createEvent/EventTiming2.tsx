import { CalendarWithTime } from "@/components/StartTimePicker";
import type { formData } from "@/types/formData";
import { type UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<formData>,
  control: Control<formData>
}

function EventTiming2({ register, control }: Props) {
  return <div className="md:flex justify-around">
    <div className="mb-5">
      <h1 className="text-2xl font-semibold text-amber-500 heading text-center mb-5">Event Timing</h1>
      <CalendarWithTime register={register} rhfName1="startTime" rhfName0="startDate" control={control} />
    </div>
    <div className="mb-5">
      <h1 className="text-2xl font-semibold text-amber-500 heading text-center mb-5">Event Registration Deadline</h1>
      <CalendarWithTime register={register} rhfName1="deadTime" rhfName0="deadDate" control={control} />
    </div>
  </div>;
}

export default EventTiming2;
