import type { DateRange } from "react-day-picker";

type formData = {
  title: string,
  desc: string,
  location: string,
  maxnums: number,
  imgurl: string,
  category: string,
  startTime: Date,
  endTime: Date,
  deadTime: Date,
  eventDate: DateRange,
  deadDate: Date
};

export type { formData };
