import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserRoundCheck, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotifyContext } from "@/context/notifyContext";

// type 
import type { notifyType } from "@/types/notification";
import { useContext } from "react";

export default function Notify() {
  // context can be null, so can't destructure it directly
  const notifyContext = useContext(NotifyContext);

  if (!notifyContext) {
    throw new Error("Context cannot be used outside its scope.")
  }

  const [notifyState] = notifyContext;

  return <NotifyComp {...notifyState} />
}

function NotifyComp(props: notifyType) {
  const type = props.type == "success" ? "default" : "destructive";

  return (<>
    <Alert
      variant={type}
      className={cn(
        "fixed top-4 z-1000 md:left-auto md:right-4 md:w-96",
        props.isActive
          ? "animate-in fade-in slide-in-from-top-2 duration-300"
          : "animate-out fade-out slide-out-to-top-2 duration-300 opacity-0 pointer-events-none"
      )}
    >      {props.type == "success" ? <UserRoundCheck /> : <Ban />}
      <AlertTitle>
        {props.title}
      </AlertTitle>
      <AlertDescription>
        {props.desc}
      </AlertDescription>
    </Alert>
  </>);
}
