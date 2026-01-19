import AuthCard from "@/components/auth-card";
import { useState, useEffect, useContext } from "react";
import Notify from "@/components/notification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

// types
import type { CredType } from "@/types/auth-card";
import type { notifyProp } from "@/types/notification";

function Login() {
  const { setAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // tracks isActive and triggers when its set to true
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
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  // verify credentials: handle login
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // post user credentials
    try {
      const res = await axios.post('http://localhost:5000/auth/login', credentials, {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log("login successful!");
        setNpProps({
          title: "Login Successful",
          description: "You will be redirected shortly.",
          type: "success",
          isActive: true,
        })

        setAuthStatus(true);
        navigate("/", {replace: true})
      } else {
        console.log("login failed!");
        setNpProps({
          title: "Login failed",
          description: res.data.message,
          type: "failure",
          isActive: true,
        })
      }
      console.log(res.data.message);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.status);
        console.log(e.response?.data?.message);
        setNpProps({
          title: "Login failed",
          description: e.response?.data?.message,
          type: "failure",
          isActive: true,
        })
      }
    }
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
