import moment from "moment-timezone";
import { pool } from "../database/client";
import { Post } from "../types";
import { PostsRepo } from "./posts";

export class CommentsRepo {
  static createComment = async (
    postId: number,
    username: string,
    commentText: string
  ) => {
    try {
      const insertIntoCommentsQuery = `INSERT INTO
         comments (post_id,user_name,comment_text,created_at) 
         VALUES ($1,$2,$3,$4)`;
      const createdAt = moment().format("DD.MM.y HH:mm:ss");
      const insertIntoCommentsValues = [
        postId,
        username,
        commentText,
        createdAt,
      ];
      pool.query(
        insertIntoCommentsQuery,
        insertIntoCommentsValues,
        (err, _res) => {
          if (err) throw err;
        }
      );
      return { success: true, message: "Comment created successfully" };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Comment doesnt created" };
    }
  };
  static deleteCommentsByUsername = async (username: string) => {
    const deleteCommentsQuery = `DELETE FROM comments WHERE post_id = $1`;

    const [posts] = await PostsRepo.selectPostsByUsername(username)
    const deleteCommentsValue = posts.map((post: Post) => post.id)

    deleteCommentsValue.forEach((value) => {
      pool.query(deleteCommentsQuery, [value], (err, _res) => {
        if (err) console.log(err);
      });
    })
    
    return { success: true, message: "Comments deleted successfully" };
  };
}
