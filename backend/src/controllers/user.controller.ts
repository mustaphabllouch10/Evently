import type { Request , Response } from "express" ; 
import User from "../models/user.js" ; 

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        const user = await User.create({ name , email , password });
        res.status(201).json({
            message : "User created successfully" ,
            user ,
        });
    
    } catch (error: any) {
        res.status(500).json({ 
            message: error.message  
        });
}
}

    
