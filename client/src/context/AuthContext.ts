import { createContext, type SetStateAction } from "react";

export interface AuthContextType {
  AuthStatus: boolean;
  loading: boolean;
  setAuthStatus: React.Dispatch<SetStateAction<boolean>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  username: string;
}

export const AuthContext = createContext<AuthContextType>({
  AuthStatus: false,
  setAuthStatus() { },
  setLoading() { },
  loading: true,
  username: ""
});

