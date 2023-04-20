import { Request, Response, NextFunction } from "express";
import { UsersRepo } from "../repositories/users";
import { badData } from "@hapi/boom";
import { PostsRepo } from "../repositories/posts";
import { CommentsRepo } from "../repositories/comments";
import { LikesRepo } from "../repositories/likes";

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
    const { username } = req.body;
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
      const posts = await PostsRepo.getPosts();
      if (!posts.length) {
        throw badData(`Something went wrong!`);
      }
      res.json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  static postById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const postExists = await PostsRepo.postExists(postId);
      if (!postExists.length) {
        throw badData("Post doesn`t exists!");
      }
      const { post, comments } = await PostsRepo.postById(postId);
      res.json({ post, comments });
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

      const postExists = await PostsRepo.postExists(postId);

      if (!postExists.length) {
        throw badData("Post doesn`t exists!");
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

  static like = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.body.postid;
      const { username } = req.body;
      const postExists = await PostsRepo.postExists(postId);

      if (!postExists.length) {
        throw badData("Post doesn`t exists!");
      }
      const like = await LikesRepo.likePost(postId, username);

      const likeDeletedMessage = "Like deleted";
      if (like?.message === likeDeletedMessage) {
        res.json({ message: likeDeletedMessage });
      }
      res.json({ message: "Post liked!" });
    } catch (err) {
      next(err);
    }
  };

  static dislike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.body.postid;
      const { username } = req.body;
      const postExists = await PostsRepo.postExists(postId);
      if (!postExists.length) {
        throw badData("Post doesn`t exists!");
      }
      const dislike = await LikesRepo.dislikePost(postId, username);
      const dislikeDeletedMessage = "Dislike deleted";
      if (dislike?.message === dislikeDeletedMessage) {
        res.json({ message: dislikeDeletedMessage });
      }
      res.json({ message: "Post disliked!" });
    } catch (err) {
      next(err);
    }
  };
}
