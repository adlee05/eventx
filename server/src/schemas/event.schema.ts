import * as z from "zod";

const formDataShape = z.object({
  title: z.string().trim().min(5).max(50),
  description: z.string().trim().min(5).max(200),
  location: z.string().trim().min(10).max(300),
  maxParticipants: z.coerce.number().int().min(1).max(100),
  imageUrl: z.string().min(0).max(300),
  category: z.enum(["recreational", "tech", "art"]),
  startDate: z.coerce.date(),
  deadDate: z.coerce.date(),
}).refine((d) => d.startDate > d.deadDate,
  {
    message: "Registration deadline should be strictly less than start time",
    path: ["deadDate"],
  }
)

export { formDataShape };
