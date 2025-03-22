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
exports.shareLink = exports.share = exports.getSpecificContent = exports.deleteContent = exports.getContent = exports.createContent = void 0;
const client_1 = require("@prisma/client");
const random_1 = __importDefault(require("../lib/random"));
const client = new client_1.PrismaClient();
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
        const newContent = yield client.content.create({
            data: {
                title: title,
                link: link,
                user_id: user_id,
                type: type
            },
            select: {
                id: true,
                user_id: true,
                title: true,
                link: true,
                type: true,
                created_at: true
            }
        });
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
        const contents = yield client.content.findMany({
            where: {
                user_id: user_id
            },
            select: {
                id: true,
                user_id: true,
                title: true,
                link: true,
                type: true,
                created_at: true
            }
        });
        res.status(200).json({ contents: contents });
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
        const deletedContent = yield client.content.delete({
            where: {
                id: Number(content_id),
                user_id: user_id
            }
        });
        if (!deletedContent) {
            res.status(404).json({ message: "Content not get deleted" });
            return;
        }
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (e) {
        console.log('Error in deleteContent controller', e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteContent = deleteContent;
const getSpecificContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const user_id = req.user.id;
    try {
        const specificContents = yield client.content.findMany(({
            where: {
                user_id: user_id,
                type: type
            }, select: {
                id: true,
                user_id: true,
                title: true,
                link: true,
                type: true,
                created_at: true
            }
        }));
        res.status(200).json({ contents: specificContents });
    }
    catch (e) {
        console.log("Error in getSpecificContent", e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSpecificContent = getSpecificContent;
const share = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const share = req.body.share;
        const user_id = req.user.id;
        if (share) {
            const hashExist = yield client.shareable_links.findUnique({
                where: {
                    user_id: user_id
                }
            });
            if (hashExist) {
                res.status(400).json({ hash: hashExist.hash });
                return;
            }
            const hash = (0, random_1.default)(10);
            yield client.shareable_links.create({
                data: {
                    user_id: user_id,
                    hash: hash
                }
            });
            res.status(200).json({ hash: hash });
            return;
        }
        else {
            const hashExist = yield client.shareable_links.findUnique({
                where: {
                    user_id: user_id
                }
            });
            if (((_a = hashExist === null || hashExist === void 0 ? void 0 : hashExist.hash) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                res.status(404).json({ message: "Hash already removed" });
                return;
            }
            yield client.shareable_links.delete({
                where: {
                    user_id: user_id
                }
            });
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
    // const hash=req.params.shareLink;
    // try{
    //     const isHashExistQuery="SELECT * FROM shareable_links WHERE hash=$1";
    //     const response=await pgClient.query(isHashExistQuery,[hash]);
    //     const shareableLink=response.rows[0];
    //     if(!shareableLink){
    //         res.status(404).json({message:"Invalid link"});
    //         return ;
    //     }
    //     const user_id=shareableLink.user_id;
    //     const getContentAndUserQuery="SELECT users.id,users.username,content.id,content.title,content.link,content.created_at FROM users JOIN content ON users.id=content.user_id WHERE users.id=$1";
    //     const response2=await pgClient.query(getContentAndUserQuery,[user_id]);
    //     const content=response2.rows;
    //     if(!content){
    //         res.status(404).json({message:"No content found"});
    //         return ;
    //     }
    //     res.status(200).json({content:content});
    // }catch(e: any){
    //     console.log("Error in shareLink controller",e.message);
    //     res.status(500).json({message:"Internal server error"});
    // }
});
exports.shareLink = shareLink;
