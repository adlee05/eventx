import { createContext, type SetStateAction } from "react";
import { type UserDetails } from "@/types/context.userDetails";

export interface AuthContextType {
  AuthStatus: boolean,
  loading: boolean,
  setAuthStatus: React.Dispatch<SetStateAction<boolean>>,
  setUserDetails: React.Dispatch<SetStateAction<UserDetails | undefined>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  userDetails: undefined | {
    location: string,
    username: string,
    firstname: string,
    lastname: string,
    bio: string,
    userId: string
  }
}

export const AuthContext = createContext<AuthContextType>({
  AuthStatus: false,
  setAuthStatus() { },
  setLoading() { },
  loading: true,
  userDetails: undefined,
  setUserDetails() { }
});

