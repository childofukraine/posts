"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepo = void 0;
const client_1 = require("../database/client");
class PostsRepo {
    static createPost = async (username, postName, postText) => {
        const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text) VALUES ($1, $2, $3)`;
        await client_1.pool.connect();
        client_1.pool.query(insertIntoPostQuery, [username, postName, postText], (err, _res) => {
            if (err)
                throw err;
        });
        return { success: true, message: "Post created successfully" };
    };
    static getPosts = async () => {
        const selectPostsQuery = `SELECT * FROM posts`;
        let posts = [];
        await client_1.pool.connect();
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
