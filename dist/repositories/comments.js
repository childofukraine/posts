"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRepo = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const client_1 = require("../database/client");
const posts_1 = require("./posts");
class CommentsRepo {
    static createComment = async (postId, username, commentText) => {
        try {
            const insertIntoCommentsQuery = `INSERT INTO
         comments (post_id,user_name,comment_text,created_at) 
         VALUES ($1,$2,$3,$4)`;
            const createdAt = (0, moment_timezone_1.default)().format("DD.MM.y HH:mm:ss");
            const insertIntoCommentsValues = [
                postId,
                username,
                commentText,
                createdAt,
            ];
            client_1.pool.query(insertIntoCommentsQuery, insertIntoCommentsValues, (err, _res) => {
                if (err)
                    throw err;
            });
            return { success: true, message: "Comment created successfully" };
        }
        catch (err) {
            console.log(err);
            return { success: false, message: "Comment doesnt created" };
        }
    };
    static deleteCommentsByUsername = async (username) => {
        const deleteCommentsQuery = `DELETE FROM comments WHERE post_id = $1`;
        const [posts] = await posts_1.PostsRepo.selectPostsByUsername(username);
        const deleteCommentsValue = posts.map((post) => post.id);
        deleteCommentsValue.forEach((value) => {
            client_1.pool.query(deleteCommentsQuery, [value], (err, _res) => {
                if (err)
                    console.log(err);
            });
        });
        return { success: true, message: "Comments deleted successfully" };
    };
}
exports.CommentsRepo = CommentsRepo;
