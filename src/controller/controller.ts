import { Request, Response, NextFunction } from "express";
import { UsersRepo } from "../repositories/users";
import { badData } from "@hapi/boom";
import { PostsRepo } from "../repositories/posts";
import { CommentsRepo } from "../repositories/comments";

export class Controller {
  static registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const userExists = await UsersRepo.findUser(username);
      if (userExists.length) {
        throw badData(`A user with this username: ${username} already exists`);
      }
      const user = await UsersRepo.addUser(username, password);
      res.json({ message: `Registration success,${username}!`, status: "ok" });
    } catch (err) {
      next(err);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await UsersRepo.findUserByNameAndPassword(
        username,
        password
      );
      if (!user.length) {
        throw badData(`Wrong username or password!`);
      }
      res.json({
        message: `Login success!`,
        status: "ok",
      });
    } catch (err) {
      next(err);
    }
  };

  static createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const username = req.body.username;
    const postName = req.body.postname;
    const postText = req.body.posttext;
    try {
      const userExists = await UsersRepo.findUser(username);
      if (!userExists.length) {
        throw badData(`A user with this username: ${username} doesnt exists!`);
      }

      const post = await PostsRepo.createPost(username, postName, postText);
      if (post.success) {
        res.json({
          message: "Post created",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  static posts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [posts] = await PostsRepo.getPosts();
      if (!posts.length) {
        throw badData(`Something went wrong!`);
      }
      res.json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  static createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.body;
    const postId = req.body.postid;
    const commentText = req.body.commenttext;

    try {
      const userExists = await UsersRepo.findUser(username);
      if (!userExists.length) {
        throw badData(`A user with this username: ${username} doesnt exists!`);
      }

      const comment = await CommentsRepo.createComment(
        postId,
        username,
        commentText
      );
      if (comment.success) {
        res.json({
          message: "Comment created",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  static postById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const { post, comments } = await PostsRepo.postById(postId);
      if (!post.length) {
        throw badData(`Something went wrong!`);
      }
      res.json({ post, comments });
    } catch (err) {
      next(err);
    }
  };
}
