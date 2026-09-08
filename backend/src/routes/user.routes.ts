import { Router } from "express";

import {
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  updateUserValidator,
  userIdValidator,
} from "../validators/user.validator.js";

const router = Router();


// Get all users
router.get(
  "/",
  getUsersController
);

// Get user by ID
router.get(
  "/:id",
  validate(userIdValidator, "params"),
  getUserByIdController
);

// Update user
router.patch(
  "/:id",
  validate(userIdValidator, "params"),
  validate(updateUserValidator, "body"),
  updateUserController
);

// Delete user
router.delete(
  "/:id",
  validate(userIdValidator, "params"),
  deleteUserController
);

export default router;