import {Request, Response} from "express";
import pgClient from "../lib/db";
import bcrypt from "bcrypt";
import generateToken from "../lib/utils";

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

        const isUserExistQuery="SELECT * FROM users WHERE username=$1";
        const response=await pgClient.query(isUserExistQuery,[username]);
        if(response.rows[0]){
            res.status(403).json({message:"user already exist"});
            return ;
        }

        const saltRound=10;
        const hashedPassword=await bcrypt.hash(password,saltRound);
        const createUserQuery="INSERT INTO users(username,password) VALUES($1,$2) RETURNING username,id,created_at";
        const response2=await pgClient.query(createUserQuery,[username,hashedPassword])
        const newUser=response2.rows[0];

        res.status(201).json({message:"user created successfully",user:newUser});
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

        const userExistQuery="SELECT * FROM users WHERE username=$1";
        const response=await pgClient.query(userExistQuery,[username]);
        const user=response.rows[0];

        if(!user){
            res.status(403).json({message:"Invalid credentials"});
            return ;
        }

        const isPasswordMatch=await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            res.status(400).json({message:"Invalid credentials"});
            return ;
        }

        const token=generateToken(user.id);

        res.status(200).json({token:token});
        return ;

    }catch(e: any){
        console.log("Error in login controller",e.message)
        res.status(500).json({message:"Internal server error"});
        return ;
    }
}

export const logout=async(req:Request, res:Response)=>{

}