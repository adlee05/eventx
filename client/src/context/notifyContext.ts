import { createContext } from "react";

type notifyType = {
  title: string;
  desc: string;
  type: "success" | "failure";
  isActive: boolean;
};

type notifyContextType = [
  notifyType,
  (notif: Omit<notifyType, "isActive">) => void
];

export const NotifyContext = createContext<notifyContextType | null>(null);

export type { notifyType, notifyContextType };
