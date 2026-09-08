import { z } from "zod"


export const updateUserValidator = z.object({
  name: z.string().min(2).max(20).optional(),

  email: z.email().optional(),

  password: z.string().min(6).optional(),
}); 

export const userIdValidator = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
});
