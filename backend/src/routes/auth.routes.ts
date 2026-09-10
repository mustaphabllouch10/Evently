import { Router } from "express";

import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerValidator, "body"),
  registerController
);

router.post(
  "/login",
  validate(loginValidator, "body"),
  loginController
);

export default router;