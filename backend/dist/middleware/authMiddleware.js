"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new client_1.PrismaClient();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    //console.log("token",token);
    try {
        if (!token) {
            res.status(401).json({ message: "Unauthorized-Token not provided" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield client.users.findUnique({
            where: {
                id: decodedToken.user_id
            },
            select: {
                id: true,
                username: true
            }
        });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        req.user = user; //although we need to attach user with proper type
        next();
    }
    catch (e) {
        console.log("Error in authMiddleware ", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.authMiddleware = authMiddleware;
