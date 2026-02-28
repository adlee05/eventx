import AuthCard from "@/components/auth-card.tsx";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { NotifyContext } from "@/context/notifyContext";

// types
import type { CredType } from "@/types/auth-card";

function SignUp() {
  const { AuthStatus, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthStatus && !loading) {
      navigate('/', { replace: true });
    }
  }, [AuthStatus, loading, navigate]);

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Context cannot be used outside its scope.");
  }

  const [, showNotification] = notifyContext;

  const [credentials, setCredentials] = useState<CredType>({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  // verify credentials: handle login
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/auth/signup`, credentials, {
        withCredentials: true,
      }); if (res.data.success) {
        navigate('/');
      } else {
        showNotification({
          title: "Signup falied",
          desc: res.data.message,
          type: "failure"
        })
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showNotification({
          title: "Signup falied",
          desc: e.response?.data?.message,
          type: "failure"
        })

      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Loading...</p>
    </div>;
  }

  return (
    <>
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
