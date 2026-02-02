import { useEffect, useState } from "react";

// type
import { NotifyContext, type notifyType } from "@/context/notifyContext";

type childrenProp = {
  children: React.ReactNode
}

export default function NotifyProvider({ children }: childrenProp) {
  const [notifyState, setNotify] = useState<notifyType>({
    title: "",
    desc: "",
    type: "failure",
    isActive: false
  });

  const hideNotification = () => {
    setNotify((prev) => ({
      ...prev,
      isActive: false
    }))
  }

  useEffect(() => {
    if (!notifyState.isActive) {
      return;
    }

    const timer = setTimeout(() => {
      hideNotification()
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifyState.isActive]);

  const showNotification = (notif: Omit<notifyType, "isActive">) => {
    setNotify({
      ...notif,
      isActive: true
    })
  }

  return <NotifyContext.Provider value={[notifyState, showNotification]}>
    {children}
  </NotifyContext.Provider>
}
