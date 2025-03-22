"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login);
router.get("/check", authMiddleware_1.authMiddleware, authController_1.authCheck);
exports.default = router;
