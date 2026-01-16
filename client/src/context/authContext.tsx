import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const authContext = createContext(null);

export function AuthContextComp({ children }) {
  const [authState, setAuthState] = useState(false);
  const [isLoading, loadingState] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/me');
        if (res.data.success) {
          setAuthState(true);
        } else {
          setAuthState(false);
        }
      } catch (e) {
        setAuthState(false);
      } finally {
        loadingState(false);
      }
    }

    checkAuth();
  }, [])

  return <authContext.Provider value={{ authState, isLoading }}>{children}</authContext.Provider>
}
