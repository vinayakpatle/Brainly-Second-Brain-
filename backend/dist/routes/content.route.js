"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
const contentController_1 = require("../controllers/contentController");
router.post("/create", authMiddleware_1.authMiddleware, contentController_1.createContent);
router.get("/get", authMiddleware_1.authMiddleware, contentController_1.getContent);
router.delete("/delete/:id", authMiddleware_1.authMiddleware, contentController_1.deleteContent);
router.post("/share", authMiddleware_1.authMiddleware, contentController_1.share);
router.get("/:shareLink", contentController_1.shareLink);
exports.default = router;
