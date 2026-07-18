import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import { NotifyContext } from "@/context/notifyContext";
import { useContext } from "react";

export function ConfirmDelete({ userId, id, onDelete }: { userId: string, id: string | undefined, onDelete: () => void; }) {
  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }

  const [, showNotification] = notifyContext;

  const handleDeleteRegistration = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_URI}/event/${id}/removeRegistration/${userId}`, {
        withCredentials: true
      })

      if (res.data.success) {
        showNotification({
          title: "Action successful",
          desc: res.data.message,
          type: "success"
        })
      }

      onDelete();
    } catch (e) {
      console.error(e);

      if (e instanceof AxiosError) {
        showNotification({
          title: "Action unsuccessful",
          desc: e.response?.data?.message,
          type: "failure"
        })
      }
    }
  }

  return <>
    <Dialog>
      <DialogTrigger className="bg-red-700 rounded-2xl p-2">
        <Trash2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete the corresponding user's
            registration from this event
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="lg"
              onClick={handleDeleteRegistration}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}
