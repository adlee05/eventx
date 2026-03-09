import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext.js";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [AuthStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER_URI + "/auth/me",
          { withCredentials: true }
        );

        if (res.data.success) {
          setAuthStatus(true);
          setUserDetails(res.data.userDetails);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ AuthStatus, setAuthStatus, loading, setLoading, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
