import express from "express";
const router=express.Router();
import {signup,login,authCheck} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

router.post("/signup", signup);
router.post("/login", login);
router.get("/check",authMiddleware,authCheck);

export default router;
