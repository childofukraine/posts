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

  static postById = async (postId: string) => {
    const selectPostByIdQuery = `SELECT * FROM posts WHERE id = $1`;
    const selectCommentsQuery = `SELECT * FROM comments WHERE post_id = $1`;
    let postArray: any[] = [];
    let commentsArray: any[] = [];
    await pool
      .query(selectPostByIdQuery, [postId])
      .then((post) => {
        postArray.push(post.rows);
      })
      .catch((err) => {
        if (err) throw err;
      });

    await pool
      .query(selectCommentsQuery, [postId])
      .then((comments) => {
        commentsArray = comments.rows;
      })
      .catch((err) => {
        if (err) throw err;
      });
    return { post: postArray[0], comments: commentsArray };
  };
}
