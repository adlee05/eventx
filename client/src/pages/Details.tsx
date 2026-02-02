import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { NotifyContext } from "@/context/notifyContext";

import { Link } from "react-router-dom";

export default function Details() {
  const { setAuthStatus } = useContext(AuthContext);

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  async function handleLogout() {
    try {
      const res = await axios.get('http://localhost:5000/auth/logout', {
        withCredentials: true,
      });

      if (res.data.success) {
        setAuthStatus(false);
      }
    } catch {
      showNotification({ 
        title: "Unable to Logout",
        desc: "Please try again later",
        type: "failure"
      })
    }
  }

  return <>
    <div className="prompt my-8">
      <h1 className="text-lg font-bold">Personal Information</h1>
      <p className="text-base">Update your personal information. These will be visible to everybody.</p>
    </div>

    <div className="form flex flex-col gap-5">
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input id="first-name" placeholder="Jordan" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input id="last-name" placeholder="Lee" />
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" placeholder="adlee05" />
        </Field>
        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input id="location" placeholder="Amaravati, AP" />
        </Field>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Input id="bio" placeholder="I organize wonderful events!" />
        </Field>
      </FieldGroup>
    </div>

    <Separator className="my-10" />

    <div className="prompt flex justify-between gap-4 items-center">
      <div>
        <h1 className="text-lg font-bold">Logout</h1>
        <p className="text-base">You can signout from your account here</p>
      </div>
      <Button onClick={handleLogout} asChild>
        <Link to=''>Logout</Link>
      </Button>
    </div>

  </>;
}
