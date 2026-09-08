import { Router } from "express";

import {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  createUserValidator,
  updateUserValidator,
  userIdValidator,
} from "../validators/user.validator.js";

const router = Router();

// Create user
router.post(
  "/",
  validate(createUserValidator, "body"),
  createUserController
);

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