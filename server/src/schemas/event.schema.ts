import * as z from "zod";

const Data = z.object({
  title: z.string().trim().min(5).max(50),
  desc: z.string().trim().min(5).max(200),
  location: z.string().trim().min(10).max(300),
  maxnums: z.number().int().min(1).max(100),
  imgurl: z.string().min(10).max(300),
  category: z.enum(["recreation", "tech", "art"]),
  startDate: z.coerce.date(),
  deadDate: z.coerce.date(),
  createdBy: z.string().min(1)
}).refine((d) => {
  const diffMs = d.startDate.getTime() - d.deadDate.getTime()
  const oneHourMs = 60 * 60 * 1000
  return diffMs >= oneHourMs
},
  {
    message: "Registration deadline must be at least 1 hour before the event start time",
    path: ["deadlineTime"],
  }
)
