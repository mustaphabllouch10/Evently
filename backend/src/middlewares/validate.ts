import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (
  schema: z.ZodType,
  target: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    next();
  };
};