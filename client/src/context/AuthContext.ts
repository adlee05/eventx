import { createContext, type SetStateAction } from "react";

export interface AuthContextType {
  AuthStatus: boolean;
  loading: boolean;
  setAuthStatus: React.Dispatch<SetStateAction<boolean>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  userDetails: undefined | {
    location: string, 
    username: string,
    firstname: string,
    lastname: string,
    bio: string
  };
}

export const AuthContext = createContext<AuthContextType>({
  AuthStatus: false,
  setAuthStatus() { },
  setLoading() { },
  loading: true,
  userDetails: undefined 
});

