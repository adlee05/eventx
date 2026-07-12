import {
  Archive,
  EditIcon,
  FileUser
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import axios, { AxiosError } from "axios"
import { NotifyContext } from "@/context/notifyContext"
import { useContext, type SetStateAction } from "react";
import type { EventType } from "@/types/event-details"
import { Link } from "react-router-dom"

interface propsType {
  isArchived: boolean,
  eventId: string | undefined,
  setDetails: React.Dispatch<SetStateAction<EventType | undefined>>,
  onViewRegistrations: () => void;
};

export function EventSettings({ isArchived, eventId, setDetails, onViewRegistrations }: propsType) {

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const handleEditing = () => {
  }

  const handleArchive = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_SERVER_URI}/event/${eventId}/archive`, {}, {
        withCredentials: true
      });

      if (res.data.success) {
        const titleText = !isArchived ? "Event has been archived" : "Event has been Unarchived";

        showNotification({
          title: titleText,
          desc: res.data.message,
          type: "success"
        })

        setDetails((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            archived: !prev?.archived
          }

        })
      } else {
        showNotification({
          title: "Unable to archive event",
          desc: res.data.message,
          type: "failure"
        })
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          title: "Unable to archive event",
          desc: e.response?.data?.message,
          type: "failure"
        });
      }

      console.error(e);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Event Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEditing}>
          <EditIcon />
          <Link to="edit">
            Edit Event Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArchive}>
          <Archive />
          {isArchived ? "Unarchive" : "Archive"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewRegistrations}>
          <FileUser />
          View Registrations
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
