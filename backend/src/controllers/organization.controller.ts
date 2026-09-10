import type { Request, Response } from "express";
import { createOrganization } from "../services/organization.service.js";

export const createOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const organization = await createOrganization(
      req.body,
      userId
    );

    res.status(201).json({
      message: "Organization created successfully",
      organization,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create organization",
    });
  }
};