import express from "express";
const router=express.Router();
import {authMiddleware} from "../middleware/authMiddleware";

import {createContent,getContent,deleteContent,getSpecificContent,share,shareLink} from "../controllers/contentController";

router.post("/create",authMiddleware, createContent);
router.get("/get",authMiddleware, getContent);
router.delete("/delete/:id",authMiddleware, deleteContent);
router.get("/get/:type",authMiddleware, getSpecificContent);
router.post("/share",authMiddleware, share);
router.get("/:shareLink", shareLink);


export default router;