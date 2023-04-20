"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRepo = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const client_1 = require("../database/client");
class CommentsRepo {
    static createComment = async (postId, username, commentText) => {
        const insertIntoCommentsQuery = `INSERT INTO
         comments (post_id,user_name,comment_text,created_at) 
         VALUES ($1,$2,$3,$4)`;
        const createdAt = (0, moment_timezone_1.default)().format("DD.MM.y HH:mm:s");
        client_1.pool.query(insertIntoCommentsQuery, [postId, username, commentText, createdAt], (err, _res) => {
            if (err)
                throw err;
        });
        return { success: true, message: "Comment created successfully" };
    };
}
exports.CommentsRepo = CommentsRepo;
