import EventDetails from "@/components/createEvent/eventDetails";
import EventTiming from "@/components/createEvent/eventTiming";
import {
  FieldSet,
} from "@/components/ui/field";

function CreatePage() {
  return <>
    <div className="max-w-4xl md:mx-auto mx-5">
      <FieldSet className="w-full bg-card p-10 rounded-xl">
        <EventDetails />
        <EventTiming />
      </FieldSet>
    </div>
  </>;
}

export default CreatePage;
