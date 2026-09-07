import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

const routes = Router();

routes.post("/create", createUser);

export default routes ; 
