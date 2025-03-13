import { Request, NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import pgClient from "../lib/db";
import dotenv from "dotenv"
dotenv.config();

interface decodedTokenType{
    user_id: string
}

export const authMiddleware=async (req: Request,res: Response,next: NextFunction)=>{
    const token=req.headers.authorization;
    //console.log("token",token);

    try{
        if(!token){
            res.status(401).json({message:"Unauthorized-Token not provided"});
        }

        const JWT_SECRET=process.env.JWT_SECRET;
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET is not defined");
        }

        const decodedToken=jwt.verify(token as string,JWT_SECRET) as decodedTokenType;

        const findUserQuery="SELECT id,username,created_at FROM users WHERE id=$1";
        const response=await pgClient.query(findUserQuery,[decodedToken.user_id]);
        const user=response.rows[0];

        if(!user){
            res.status(400).json({message:"User not found"});
        }

        (req as any).user=user;  //although we need to attach user with proper type
        next();

    }catch(e: any){
        console.log("Error in authMiddleware ",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}