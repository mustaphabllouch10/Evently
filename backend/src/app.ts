import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import organizationRoutes from "./routes/organization.routes.js";


dotenv.config();
    
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/organizations", organizationRoutes);



export default app;