import { z } from "zod";

export const registerValidator = z.object({
  name: z.string().min(2).max(20),
  email: z.email(),
  password: z.string().min(6),
});

export const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(6),
});