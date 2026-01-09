type notifyType = {
  title: string,
  description: string,
  type: "success" | "failure",
  isActive: boolean
}

interface notifyProp {
  title: string;
  description: string;
  type: "success" | "failure";
  isActive: boolean
};

export type { notifyType, notifyProp };
