import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserRoundCheck, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

// type 
import type { notifyType } from "@/types/notification";

export default function Notify(props: notifyType) {
  const type = props.type == "success" ? "default" : "destructive";

  return (<>
    <Alert variant={type} className={cn(
        "max-w-sm absolute z-10 top-0 right-0 m-4",
        props.isActive
          ? "animate-in fade-in slide-in-from-top-2 duration-300 opacity-100"
          : "animate-out fade-out slide-out-to-top-2 duration-300 opacity-0 pointer-events-none"
      )}>
      {props.type == "success" ? <UserRoundCheck /> : <Ban />}
      <AlertTitle>
        {props.title}
      </AlertTitle>
      <AlertDescription>
        {props.description}
      </AlertDescription>
    </Alert>
  </>);
}
