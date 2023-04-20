import moment from "moment-timezone";
import { pool } from "../database/client";

export class PostsRepo {
  static createPost = async (
    username: string,
    postName: string,
    postText: string
  ) => {
    const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text,created_at) VALUES ($1, $2, $3,$4)`;
    const createdAt = moment().format("DD.MM.y HH:mm:s");
    pool.query(
      insertIntoPostQuery,
      [username, postName, postText, createdAt],
      (err, _res) => {
        if (err) throw err;
      }
    );
    return { success: true, message: "Post created successfully" };
  };

  static getPosts = async () => {
    const selectPostsQuery = `SELECT * FROM posts`;
    let posts: any[] = [];

    await pool
      .query(selectPostsQuery)
      .then((result) => {
        posts.push(result.rows);
      })
      .catch((err) => {
        if (err) throw err;
      });
    return posts;
  };
}
