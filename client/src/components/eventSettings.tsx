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

export function EventSettings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Event Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <EditIcon />
          Edit Event Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive />
          Archive Event
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileUser />
          View Registered Users
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
