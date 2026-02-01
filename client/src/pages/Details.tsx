import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import type { notifyProp } from "@/types/notification";
import { Link } from "react-router-dom";

export default function Details() {
  const { setAuthStatus } = useContext(AuthContext);

  async function handleLogout() {
    try {
      const res = await axios.get('http://localhost:5000/auth/logout', {
        withCredentials: true,
      });

      if (res.data.success) {
        setAuthStatus(false);
      }
    } catch {
      setNpProps({
        title: "Error",
        description: "Error logging out",
        type: "failure",
        isActive: true,
      })
    }
    console.log('action performed');

  }

  const [npProps, setNpProps] = useState<notifyProp>({
    title: "",
    description: "",
    type: "failure",
    isActive: false,
  });

  useEffect(() => {
    if (!npProps.isActive) return;

    const timer = setTimeout(() => {
      setNpProps((prev: notifyProp) => ({
        ...prev,
        isActive: false,
      }))
    }, 3000);

    return () => clearTimeout(timer);
  }, [npProps.isActive]);


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
