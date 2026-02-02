type notifyType = {
  title: string,
  desc: string,
  type: "success" | "failure",
  isActive: boolean
}

interface notifyProp {
  title: string;
  desc: string;
  type: "success" | "failure";
  isActive: boolean
};

export type { notifyType, notifyProp };
