import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { NotifyContext } from "@/context/notifyContext";

import { Link } from "react-router-dom";
import { ArrowDown01 } from "lucide-react";

function Details() {
  const { setAuthStatus } = useContext(AuthContext);

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  // stateful inputs
  const [inputs, setInputs] = useState({
    fName: "",
    lName: "",
    username: "",
    location: "",
    bio: ""
  })

  async function handleLogout() {
    if (inputs.fName == "")

      try {
        const res = await axios.get(import.meta.env.VITE_SERVER_URI + '/auth/logout', {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URI}/profile/update`,
        inputs, {
        withCredentials: true
      });

      if (res.data.success) {
        showNotification({
          title: "Profile Successfully Updated",
          desc: "Changes will be reflected shortly",
          type: "success"
        })
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        showNotification({
          title: "Update Unsuccessful",
          desc: e.response?.data?.message,
          type: "failure"
        })
      }
    }
  };

  return <>
    <div className="prompt my-8">
      <h1 className="text-lg font-bold">Personal Information</h1>
      <p className="text-base">Update your personal information. These will be visible to everybody.</p>
    </div>

    <div className="form">
      <form action="" className="flex flex-col gap-5" onSubmit={submitForm}>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="fName">First Name</FieldLabel>
            <Input id="fName" placeholder="Jordan" value={inputs.fName} onChange={handleInputChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="lName">Last Name</FieldLabel>
            <Input id="lName" placeholder="Lee" value={inputs.lName} onChange={handleInputChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" placeholder="adlee05" value={inputs.username} onChange={handleInputChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input id="location" placeholder="Amaravati, AP" value={inputs.location} onChange={handleInputChange} />
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Input id="bio" placeholder="I organize wonderful events!" value={inputs.bio} onChange={handleInputChange} />
          </Field>
        </FieldGroup>
        <Button disabled={
          inputs.fName.length == 0
          && inputs.lName.length == 0
          && inputs.location.length == 0
          && inputs.bio.length == 0
          && inputs.username.length == 0
        } className="w-min" type="submit">Update</Button>
      </form>
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

export default Details;
