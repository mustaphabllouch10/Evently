import { z } from "zod"

export const createUserValidator = z.object({
  name: z.string().min(2).max(20),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["admin", "organizer"])
});

