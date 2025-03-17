import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../lib/utils";

const client=new PrismaClient();

export const signup=async (req:Request, res:Response): Promise<void>=>{
    const username=req.body.username;
    const password=req.body.password;

    try{
        if(!username || !password){
            res.status(400).json({message:"please fill all fields"});
            return ;
        }
        if(password.length<6){
            res.status(411).json({message:"password must be at least 6 characaters"});
            return ;
        }
        const userExistAlready=await client.users.findUnique({
            where:{
                username:username
            }
        })
        if(userExistAlready){
            res.status(403).json({message:"user already exist"});
            return ;
        }

        const saltRound=10;
        const hashedPassword=await bcrypt.hash(password,saltRound);
        const newUser=await client.users.create({
            data:{
                username:username,
                password:hashedPassword
            }
        })

        res.status(201).json({message:"user created successfully"});
        return ;

    }catch(e: any){
        console.log("Error in signup controller",e.message);
        res.status(500).json({message:"Internal server error"});
        return ;
    }
}

export const login =async(req:Request, res:Response): Promise<void>=>{
    const username=req.body.username;
    const password=req.body.password;

    try{
        if(!username || !password){
            res.status(400).json({message:"please fill all fields"});
            return ;
        }
        const response=await client.users.findUnique({
            where:{
                username:username
            }
        })

        if(!response){
            res.status(403).json({message:"Invalid credentials"});
            return ;
        }

        const isPasswordMatch=await bcrypt.compare(password,response.password);

        if(!isPasswordMatch){
            res.status(400).json({message:"Invalid credentials"});
            return ;
        }

        const token=generateToken(response.id);

        res.status(200).json({token:token,user:{
            id:response.id,
            username:response.username
        }});
        return ;

    }catch(e: any){
        console.log("Error in login controller",e.message)
        res.status(500).json({message:"Internal server error"});
        return ;
    }
}

export const logout=async(req:Request, res:Response)=>{

}