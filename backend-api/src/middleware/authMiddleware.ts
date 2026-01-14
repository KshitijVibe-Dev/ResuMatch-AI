import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Request ko modify kar rahe hain taaki usme 'user' data aa sake
export interface AuthRequest extends Request {
    user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Token nikalna (Bearer <token>)
            token = req.headers.authorization.split(" ")[1];

            // Verify karna
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.user = decoded; // User ka data request me daal diya
            next(); // Aage jane do
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};