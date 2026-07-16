import * as z from "zod";

const EVENT_CATEGORIES = ["art", "tech", "recreational"] as const;

const getAllEventsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().trim().optional(),
  category: z
    .union([
      z.enum(EVENT_CATEGORIES),
      z.array(z.enum(EVENT_CATEGORIES)),
    ])
    .optional(),
});

export { getAllEventsQuerySchema };
