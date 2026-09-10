import { Router } from "express";

import {
  createOrganizationController,
} from "../controllers/organization.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.js";
import {
  createOrganizationValidator,
} from "../validators/organization.validator.js";

const router = Router();

router.post(
  "/",
  authenticate,
  requireRole("organizer"),
  validate(createOrganizationValidator, "body"),
  createOrganizationController
);

export default router;