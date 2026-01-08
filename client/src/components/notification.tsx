import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserRoundCheck } from "lucide-react";

// type 
import type { notifyType } from "@/types/notification";

export default function Notify(props: notifyType) {
  const type = props.type == "success" ? "default" : "destructive";
  return (<>
    <Alert variant={type} className="max-w-sm absolute z-10 top-0 right-0 m-4">
      <UserRoundCheck />
      <AlertTitle>
        {props.title}
      </AlertTitle>
      <AlertDescription>
        {props.description}
      </AlertDescription>
    </Alert>
  </>);
}
