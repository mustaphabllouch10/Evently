import { Router } from "express";

import {
    createOrganizationController,
    getOrganizationsController,
    getMyOrganizationsController,
    getOrganizationByIdController,
    updateOrganizationController,
    deleteOrganizationController
} from "../controllers/organization.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.js";
import {
  createOrganizationValidator,
  updateOrganizationValidator
} from "../validators/organization.validator.js";

const router = Router();

router.post(
  "/",
  authenticate,
  requireRole("organizer"),
  validate(createOrganizationValidator, "body"),
  createOrganizationController
);

router.get(
    "/myOrganizations", 
    requireRole("organizer"),
    authenticate,
    getMyOrganizationsController
);

router.get(
    "/:id",
    requireRole("organizer"),
    authenticate,
    getOrganizationByIdController
);

router.put(
    "/:id",
    requireRole("organizer"),
    authenticate,
    validate(updateOrganizationValidator, "body"),
    updateOrganizationController
);

router.delete(
    "/:id",
    requireRole("organizer"),
    authenticate,
    deleteOrganizationController
);

export default router;