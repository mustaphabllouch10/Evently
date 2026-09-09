import { Router } from "express";

import {
  getCurrentUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middlware.js";

import {
  updateUserValidator,
  userIdValidator,
} from "../validators/user.validator.js";

const router = Router();


// Get me 
router.get(
    "/me" ,
    authenticate , 
    getCurrentUserController 
) ; 

// Get all users
router.get(
  "/",
  requireRole("admin"),
  getUsersController
);

// Get user by ID
router.get(
  "/:id",
  authenticate, 
  requireRole("admin"),
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