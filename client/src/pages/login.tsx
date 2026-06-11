import AuthCard from "@/components/auth-card";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { NotifyContext } from "@/context/notifyContext";

// types
import type { CredType } from "@/types/auth-card";

function Login() {
  const { setAuthStatus, AuthStatus, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthStatus && !loading) {
      navigate('/', { replace: true });
    }
  }, [AuthStatus, loading, navigate]);

  const notifyContext = useContext(NotifyContext);
  if (!notifyContext) {
    throw new Error("Cannot use context outside its scope.");
  }
  const [, showNotification] = notifyContext;

  const [credentials, setCredentials] = useState<CredType>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  // verify credentials: handle login
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("im clicked")
    // post user credentials
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/auth/login`, credentials, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAuthStatus(true);
        navigate("/", { replace: true })
      } else {
        console.log("login failed!");
        showNotification({
          title: "Login failed",
          desc: res.data.error,
          type: "failure"
        })
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showNotification({
          title: "Login failed",
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
          title="Login to your EventX account"
          description="Login in with you email and password"
          type="Login"
          fields={["email", "password"]}
          value={credentials}
          onChangeElem={handleChange}
          onSubmit={handleLogin}
        />
      </div>
    </>
  );
}

export default Login;
