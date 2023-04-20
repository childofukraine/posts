import moment from "moment-timezone";
import { pool } from "../database/client";

export class CommentsRepo {
  static createComment = async (
    postId: number,
    username: string,
    commentText: string
  ) => {
    const insertIntoCommentsQuery = `INSERT INTO
         comments (post_id,user_name,comment_text,created_at) 
         VALUES ($1,$2,$3,$4)`;
    const createdAt = moment().format("DD.MM.y HH:mm:s");
    pool.query(
      insertIntoCommentsQuery,
      [postId, username, commentText, createdAt],
      (err, _res) => {
        if (err) throw err;
      }
    );
    return { success: true, message: "Comment created successfully" };
  };
}
