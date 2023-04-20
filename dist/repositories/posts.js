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
        const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text,created_at,likes_count,dislikes_count) VALUES ($1, $2, $3,$4,$5,$6)`;
        const createdAt = (0, moment_timezone_1.default)().format("DD.MM.y HH:mm:ss");
        const insertIntoValues = [username, postName, postText, createdAt, 0, 0];
        client_1.pool.query(insertIntoPostQuery, insertIntoValues, (err, _res) => {
            if (err)
                throw err;
        });
        return { success: true, message: "Post created successfully" };
    };
    static getPosts = async () => {
        const selectPostsQuery = `SELECT * FROM posts ORDER BY rating DESC`;
        const { rows: posts } = await client_1.pool.query(selectPostsQuery);
        return posts;
    };
    static postById = async (postId) => {
        const selectPostByIdQuery = `SELECT * FROM posts WHERE id = $1`;
        const selectCommentsQuery = `SELECT * FROM comments WHERE post_id = $1`;
        const selectValues = [postId];
        const { rows: post } = await client_1.pool.query(selectPostByIdQuery, selectValues);
        const { rows: comments } = await client_1.pool.query(selectCommentsQuery, selectValues);
        return { post, comments };
    };
    static postExists = async (postId) => {
        const selectPostByIdQuery = `SELECT * FROM posts WHERE id = $1`;
        const selectValues = [postId];
        const { rows: post } = await client_1.pool.query(selectPostByIdQuery, selectValues);
        return post;
    };
}
exports.PostsRepo = PostsRepo;
