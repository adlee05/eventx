import AuthCard from "@/components/auth-card";
import { useState } from "react";
import axios from "axios";

// types
import type { CredType } from "@/types/auth-card";

function Login() {
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
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // post user credentials
    //   try {
    //     const res = axios.post('http://localhost:5000/auth/login')
    //   } catch (e) {
    //
    //   }
  };

  return (
    <div className="flex justify-center">
      <AuthCard
        title="Login to your EventX account"
        description="Login in with you email and password"
        type="Login"
        fields={["email", "password"]}
        value={credentials}
        onChangeElem={handleChange}
        onSubmit={handleLogin}
      />
    </div>
  );
}

export default Login;
