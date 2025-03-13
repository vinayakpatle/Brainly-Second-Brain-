import express from "express";
const router=express.Router();
import {authMiddleware} from "../middleware/authMiddleware";

import {createContent,getContent,deleteContent,share,shareLink} from "../controllers/contentController";

router.post("/create",authMiddleware, createContent);
router.get("/get",authMiddleware, getContent);
router.delete("/delete/:id",authMiddleware, deleteContent);
router.post("/share",authMiddleware, share);
router.get("/:shareLink", shareLink);


export default router;