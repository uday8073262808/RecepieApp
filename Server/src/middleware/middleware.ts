//middleware.ts




import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";







interface DecodedToken {
    id: string;
  
}



export interface AuthRequest extends Request {
  userId?: String;
}



export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    


    if (!token) {
            return res.status(401).json({
                success: false, message: 'Unauthorized' });
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            req.userId = decoded.id;
            next();

        }catch(e){
            res.status(401).json({
                success: false, message: 'Invalid token' });
        }
};
