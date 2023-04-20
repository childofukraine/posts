"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepo = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const client_1 = require("../database/client");
class PostsRepo {
    static createPost = async (username, postName, postText) => {
        const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text,created_at) VALUES ($1, $2, $3,$4)`;
        const createdAt = (0, moment_timezone_1.default)().format("DD.MM.y HH:mm:s");
        client_1.pool.query(insertIntoPostQuery, [username, postName, postText, createdAt], (err, _res) => {
            if (err)
                throw err;
        });
        return { success: true, message: "Post created successfully" };
    };
    static getPosts = async () => {
        const selectPostsQuery = `SELECT * FROM posts`;
        let posts = [];
        await client_1.pool
            .query(selectPostsQuery)
            .then((result) => {
            posts.push(result.rows);
        })
            .catch((err) => {
            if (err)
                throw err;
        });
        return posts;
    };
}
exports.PostsRepo = PostsRepo;
