"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const users_1 = require("../repositories/users");
const boom_1 = require("@hapi/boom");
const posts_1 = require("../repositories/posts");
const comments_1 = require("../repositories/comments");
class Controller {
    static registration = async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const userExists = await users_1.UsersRepo.findUser(username);
            if (userExists.length) {
                throw (0, boom_1.badData)(`A user with this username: ${username} already exists`);
            }
            const user = await users_1.UsersRepo.addUser(username, password);
            res.json({ message: `Registration success,${username}!`, status: "ok" });
        }
        catch (err) {
            next(err);
        }
    };
    static login = async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await users_1.UsersRepo.findUserByNameAndPassword(username, password);
            if (!user.length) {
                throw (0, boom_1.badData)(`Wrong username or password!`);
            }
            res.json({
                message: `Login success!`,
                status: "ok",
            });
        }
        catch (err) {
            next(err);
        }
    };
    static createPost = async (req, res, next) => {
        const username = req.body.username;
        const postName = req.body.postname;
        const postText = req.body.posttext;
        try {
            const userExists = await users_1.UsersRepo.findUser(username);
            if (!userExists.length) {
                throw (0, boom_1.badData)(`A user with this username: ${username} doesnt exists!`);
            }
            const post = await posts_1.PostsRepo.createPost(username, postName, postText);
            if (post.success) {
                res.json({
                    message: "Post created",
                });
            }
        }
        catch (err) {
            next(err);
        }
    };
    static posts = async (req, res, next) => {
        try {
            const [posts] = await posts_1.PostsRepo.getPosts();
            if (!posts.length) {
                throw (0, boom_1.badData)(`Something went wrong!`);
            }
            res.json({ data: posts });
        }
        catch (err) {
            next(err);
        }
    };
    static createComment = async (req, res, next) => {
        const { username } = req.body;
        const postId = req.body.postid;
        const commentText = req.body.commenttext;
        try {
            const userExists = await users_1.UsersRepo.findUser(username);
            if (!userExists.length) {
                throw (0, boom_1.badData)(`A user with this username: ${username} doesnt exists!`);
            }
            const comment = await comments_1.CommentsRepo.createComment(postId, username, commentText);
            if (comment.success) {
                res.json({
                    message: "Comment created",
                });
            }
        }
        catch (err) {
            next(err);
        }
    };
    static postById = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { post, comments } = await posts_1.PostsRepo.postById(postId);
            if (!post.length) {
                throw (0, boom_1.badData)(`Something went wrong!`);
            }
            res.json({ post, comments });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.Controller = Controller;
