import AuthCard from "@/components/auth-card.tsx";
import {useState} from "react";
// types
import type { CredType } from "@/types/auth-card";

function SignUp() {
  const [credentials, setCredentials] = useState<CredType>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  };

  // verify credentials: handle login
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("signup handled");
  };

  return (
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
  );
}

export default SignUp;
