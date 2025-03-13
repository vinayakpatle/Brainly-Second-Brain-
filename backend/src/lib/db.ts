import pg from "pg";
import {Client} from "pg";
import dotenv from "dotenv";
dotenv.config();

const pgClient=new Client(process.env.POSTGRES_URL);
pgClient.connect()
.then(()=>console.log("Connected to postgresSQL"))
.catch((e)=>console.log("Database connection error",e.message));


export default pgClient;