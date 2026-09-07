import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();
    
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes);



export default app;