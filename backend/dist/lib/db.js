"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pgClient = new pg_1.Client(process.env.POSTGRES_URL);
pgClient.connect()
    .then(() => console.log("Connected to postgresSQL"))
    .catch((e) => console.log("Database connection error", e.message));
exports.default = pgClient;
