    import type { Request, Response, NextFunction } from "express";

export const hello = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Middleware logic goes here

  next();
};