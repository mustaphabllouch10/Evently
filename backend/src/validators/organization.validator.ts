import { z } from "zod";

export const createOrganizationValidator = z.object({
  name: z.string().min(2).max(100),
});

export const updateOrganizationValidator = z.object({
  name: z.string().min(2).max(100),
});