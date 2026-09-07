import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const routes = Router();

routes.post("/create", createUser);

export default routes ; 
