import AuthCard from "@/components/auth-card.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/components/notification";
// types
import type { CredType } from "@/types/auth-card";
import type { notifyProp } from "@/types/notification";

function SignUp() {
  const [credentials, setCredentials] = useState<CredType>({
    email: "",
    password: "",
  });

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


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  };

  // verify credentials: handle login
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/signup', credentials, {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("signup successful!");
        setNpProps({
          title: "SignUp Successful",
          description: "You will be redirected shortly.",
          type: "success",
          isActive: true,
        })

      } else {
        console.log("signup failed!");
      }
      console.log(res.data.message);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.status);
        console.log(e.response?.data?.message);
        setNpProps({
          title: "SignUp failed",
          description: e.response?.data?.message,
          type: "failure",
          isActive: true,
        })

      }
    }
    console.log("signup handled");
  };

  return (
    <>
      <Notify
        title={npProps.title}
        type={npProps.type}
        description={npProps.description}
        isActive={npProps.isActive}
      />
      <div className="flex justify-center">
        <AuthCard
          title="Sign Up to EventX"
          description="Sign Up with you email and password. Set a unique username"
          type="SignUp"
          fields={["email", "password", "username"]}
          onSubmit={handleSignUp}
          onChangeElem={handleChange}
          value={credentials}
        />
      </div>
    </>
  );
}

export default SignUp;
