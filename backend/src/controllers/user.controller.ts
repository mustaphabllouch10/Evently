import type { Request, Response } from "express";
import { createUser as createUserService } from "../services/user.service.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Email already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};