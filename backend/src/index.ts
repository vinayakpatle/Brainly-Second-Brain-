import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from "./routes/auth.route";
import contentRoutes from "./routes/content.route"; 
dotenv.config();


const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/content",contentRoutes);




const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})