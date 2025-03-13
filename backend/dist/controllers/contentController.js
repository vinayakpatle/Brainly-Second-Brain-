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
exports.shareLink = exports.share = exports.deleteContent = exports.getContent = exports.createContent = void 0;
const db_1 = __importDefault(require("../lib/db"));
const random_1 = __importDefault(require("../lib/random"));
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    try {
        if (!title || !link || !type) {
            res.status(400).json({ message: "Please fill all fields" });
            return;
        }
        const user_id = req.user.id;
        const createContentQuery = "INSERT INTO content(title,link,user_id,type) VALUES($1,$2,$3,$4) RETURNING *";
        const response = yield db_1.default.query(createContentQuery, [title, link, user_id, type]);
        const newContent = response.rows[0];
        if (!newContent) {
            res.status(500).json({ message: "Error in creating content" });
            return;
        }
        res.status(201).json({ message: "Content created successfully", content: newContent });
    }
    catch (e) {
        console.log("Error in createContent controller", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createContent = createContent;
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const getContentQuery = "SELECT users.id,users.username,content.id,content.title,content.link,content.type,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
        const response = yield db_1.default.query(getContentQuery, [user_id]);
        const content = response.rows;
        res.status(200).json({ content: content });
    }
    catch (e) {
        console.log("Error in getContent controller", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getContent = getContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content_id = req.params.id;
    try {
        const user_id = req.user.id;
        const deleteContentQuery = "DELETE FROM content WHERE id=$1 AND user_id=$2 RETURNING *";
        const response = yield db_1.default.query(deleteContentQuery, [content_id, user_id]);
        const deletedContent = response.rows[0];
        if (!deletedContent) {
            res.status(404).json({ message: "Content not get deleted" });
            return;
        }
        res.status(200).json({ message: "Content deleted successfully", content: deletedContent });
    }
    catch (e) {
        console.log('Error in deleteContent controller', e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteContent = deleteContent;
const share = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const share = req.body.share;
        const user_id = req.user.id;
        if (share) {
            const isHashExistQuery = "SELECT * FROM shareable_links WHERE user_id=$1";
            const response = yield db_1.default.query(isHashExistQuery, [user_id]);
            const shareableLink = response.rows[0];
            if (shareableLink) {
                res.status(400).json({ hash: shareableLink.hash });
                return;
            }
            const hash = (0, random_1.default)(10);
            const createShareableLinkQuery = "INSERT INTO shareable_links(user_id,hash) VALUES($1,$2)";
            yield db_1.default.query(createShareableLinkQuery, [user_id, hash]);
            res.status(200).json({ hash: hash });
            return;
        }
        else {
            const isHashExistQuery = "SELECT * FROM shareable_links WHERE user_id=$1";
            const response = yield db_1.default.query(isHashExistQuery, [user_id]);
            if (response.rows.length === 0) {
                res.status(404).json({ message: "Hash already removed" });
                return;
            }
            const deleteShareableLinkQuery = "DELETE FROM shareable_links WHERE user_id=$1";
            yield db_1.default.query(deleteShareableLinkQuery, [user_id]);
            res.status(200).json({ message: "Hash romoved successfully" });
        }
    }
    catch (e) {
        console.log("Error in share controller", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.share = share;
const shareLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const isHashExistQuery = "SELECT * FROM shareable_links WHERE hash=$1";
        const response = yield db_1.default.query(isHashExistQuery, [hash]);
        const shareableLink = response.rows[0];
        if (!shareableLink) {
            res.status(404).json({ message: "Invalid link" });
            return;
        }
        const user_id = shareableLink.user_id;
        const getContentAndUserQuery = "SELECT users.id,users.username,content.id,content.title,content.link,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
        const response2 = yield db_1.default.query(getContentAndUserQuery, [user_id]);
        const content = response2.rows;
        if (!content) {
            res.status(404).json({ message: "No content found" });
            return;
        }
        res.status(200).json({ content: content });
    }
    catch (e) {
        console.log("Error in shareLink controller", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.shareLink = shareLink;
