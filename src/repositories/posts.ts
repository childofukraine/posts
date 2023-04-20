import moment from "moment-timezone";
import { pool } from "../database/client";

export class PostsRepo {
  static createPost = async (
    username: string,
    postName: string,
    postText: string
  ) => {
    const insertIntoPostQuery = `INSERT INTO posts (user_name, post_name, post_text,created_at,likes_count,dislikes_count) VALUES ($1, $2, $3,$4,$5,$6)`;
    const createdAt = moment().format("DD.MM.y HH:mm:ss");
    const insertIntoValues = [username, postName, postText, createdAt, 0, 0];
    pool.query(insertIntoPostQuery, insertIntoValues, (err, _res) => {
      if (err) throw err;
    });
    return { success: true, message: "Post created successfully" };
  };

  static getPosts = async () => {
    const selectPostsQuery = `SELECT * FROM posts ORDER BY rating DESC`;
    const { rows: posts } = await pool.query(selectPostsQuery);
    return posts;
  };

  static postById = async (postId: string) => {
    const selectPostByIdQuery = `SELECT * FROM posts WHERE id = $1`;
    const selectCommentsQuery = `SELECT * FROM comments WHERE post_id = $1`;
    const selectValues = [postId];

    const { rows: post } = await pool.query(selectPostByIdQuery, selectValues);
    const { rows: comments } = await pool.query(
      selectCommentsQuery,
      selectValues
    );

    return { post, comments };
  };

  static postExists = async (postId: string) => {
    const selectPostByIdQuery = `SELECT * FROM posts WHERE id = $1`;

    const selectValues = [postId];
    const { rows: post } = await pool.query(selectPostByIdQuery, selectValues);

    return post;
  };
}
