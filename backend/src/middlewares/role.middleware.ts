import type { Request , Response , NextFunction } from "express" ; 

type Role = "organizer" | "admin" ; 

export const requireRole = (requiredRole : Role ) => {
    return (req:Request , res:Response , next:NextFunction) => {

        if (!req.user) {

            return res.status(401).json({
                message : "authentication required" ,
            })
        }

        if (req.user.role !== requiredRole) {

            return res.status(403).json({
                message : "access denied" , 
            });
        }

        next(); 
    }
}