import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserValidator } from "../validators/user.validator.js";

const routes = Router();


routes.post("/create", validate(createUserValidator), createUser);

export default routes ; 
