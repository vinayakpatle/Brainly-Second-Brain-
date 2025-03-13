import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Response} from "express";
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

const generateToken=(user_id: number)=>{
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ user_id }, JWT_SECRET);

    return token;
}

export default generateToken;