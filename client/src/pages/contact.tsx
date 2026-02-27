import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, type Dispatch, type SetStateAction, useContext } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import axios, { AxiosError } from "axios";
import { ChevronDown } from "lucide-react";
import { NotifyContext } from "@/context/notifyContext";

type issueType = {
  issue: string,
  setIssue: Dispatch<SetStateAction<string>>
}

export default function Contact() {
  const [issue, setIssue] = useState("Select Issue");
  const [message, setMessage] = useState("");

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const options: Array<string> = ["Bug", "Others", "New Feature Suggestion", "UI Suggestion"];

  const handleSubmit = async () => {
    if (!options.includes(issue)) {
      showNotification({
        type: "failure",
        title: "Failed to record feedback",
        desc: "Select an Issue type to post feedback."
      })
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/contact',
        { issue: issue, message: message },
        { withCredentials: true }
      );

      if (res.data.success) {
        showNotification({
          type: "success",
          title: "Feedback sent successfully.",
          desc: "You may be contacted later regarding this issue"
        })
      } else {
        showNotification({
          type: "failure",
          title: "Failed to record feedback",
          desc: res.data.message
        })
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        showNotification({
          type: "failure",
          title: "Failed to record feedback",
          desc: e.response?.data?.message
        })
      }
    }
  };

  return (
    <>
      <div className=" md:max-w-4xl flex flex-col p-10 mx-auto">
        <div className="prompt text-center">
          <h1 className="text-3xl font-bold">
            Have Questions? We Have the Answers (Hope so)
          </h1>
          <p className="mt-2 text-base text-gray-400">
            Post any questions you have. We'll try our best to address them ASAP
          </p>
        </div>
        <div className="issue flex items-center gap-10 p-10 mx-auto">
          <IssueDropdown issue={issue} setIssue={setIssue} />
        </div>
        <Field>
          <FieldLabel htmlFor="textarea-message" className="text-xl">Message</FieldLabel>
          <Textarea
            id="textarea-message"
            placeholder="Type your message here."
            value={message}
            onChange={(event) => setMessage(event.target.value)} />
        </Field>
        <Button className="w-fit mt-[1em]" onClick={handleSubmit}>Submit</Button>
      </div>
      <BackgroundBeams className="-z-10" />
    </>
  );
}

function IssueDropdown({ issue, setIssue }: issueType) {
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">{issue} <ChevronDown /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setIssue("Bug")}>Bug</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIssue("New Feature Suggestion")}>New Feature Suggestion</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIssue("UI Suggestion")}>UI Suggestion</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIssue("Others")}>Others</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </>;
}
