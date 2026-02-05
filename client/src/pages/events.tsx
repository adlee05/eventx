import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Events() {
  return (
    <>
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex justify-between items-center">
          <div className="greeting">
            <h1 className="text-lg font-bold">Events</h1>
            <p className="text-base">View all available events</p>
          </div>
          <Button variant="outline"><Plus /> Create Event</Button>
        </div>
      </div>
    </>
  );
}
