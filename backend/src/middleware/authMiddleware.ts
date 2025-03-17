import { Request, NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv"
dotenv.config();

const client=new PrismaClient();

interface decodedTokenType{
    user_id: number
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

        const user=await client.users.findUnique({
            where:{
                id:decodedToken.user_id
            },
            select:{
                id:true,
                username:true
            }
        })

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