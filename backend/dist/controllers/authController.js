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
exports.logout = exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = __importDefault(require("../lib/utils"));
const client = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            res.status(400).json({ message: "please fill all fields" });
            return;
        }
        if (password.length < 6) {
            res.status(411).json({ message: "password must be at least 6 characaters" });
            return;
        }
        const userExistAlready = yield client.users.findUnique({
            where: {
                username: username
            }
        });
        if (userExistAlready) {
            res.status(403).json({ message: "user already exist" });
            return;
        }
        const saltRound = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRound);
        const newUser = yield client.users.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: "user created successfully" });
        return;
    }
    catch (e) {
        console.log("Error in signup controller", e.message);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            res.status(400).json({ message: "please fill all fields" });
            return;
        }
        const response = yield client.users.findUnique({
            where: {
                username: username
            }
        });
        if (!response) {
            res.status(403).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, response.password);
        if (!isPasswordMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = (0, utils_1.default)(response.id);
        res.status(200).json({ token: token, user: {
                id: response.id,
                username: response.username
            } });
        return;
    }
    catch (e) {
        console.log("Error in login controller", e.message);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
