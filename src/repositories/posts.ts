import { pool } from "../database/client";
import { Post } from "../types";

export class PostsRepo {
  static createPost = async (
    username: string,
    postName: string,
    postText: string
  ) => {
    const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text) VALUES ($1, $2, $3)`;
    await pool.connect();
    pool.query(
      insertIntoPostQuery,
      [username, postName, postText],
      (err, _res) => {
        if (err) throw err;
      }
    );
    return { success: true, message: "Post created successfully" };
  };

  static getPosts = async () => {
    const selectPostsQuery = `SELECT * FROM posts`;
    let posts: any[] = [];
    await pool.connect();

    await pool
      .query(selectPostsQuery)
      .then((result) => {
        posts.push(result.rows)
      })
      .catch((err) => {
        if (err) throw err;
      });
      return posts
    };

}
