import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
    
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



export default app;