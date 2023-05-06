import { pool } from "../database/client";
import { Post } from "../types";
import { PostsRepo } from "./posts";

export class LikesRepo {
  static likePost = async (postId: string, username: string) => {
    try {
      // Проверяем, лайкнул ли пользователь уже пост
      const checkLikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = true;
      `;
      const checkLikeValues = [postId, username];
      const { rows: existingLikes } = await pool.query(
        checkLikeQuery,
        checkLikeValues
      );

      // Если пользователь уже лайкнул пост, удаляем лайк
      if (existingLikes.length > 0) {
        const { id } = existingLikes[0];
        if (id) {
          const deleteLikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
          const deleteLikeValues = [id];
          await pool.query(deleteLikeQuery, deleteLikeValues);

          const updateLikesQuery = `
            UPDATE posts
            SET likes_count = likes_count - 1
            WHERE id = $1;
          `;
          const updateLikesValues = [postId];
          await pool.query(updateLikesQuery, updateLikesValues);

          return { success: true, message: "Like deleted" };
        }
      }

      // Проверяем, поставил ли пользователь дизлайк посту
      const checkDislikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = false;
      `;
      const checkDislikeValues = [postId, username];
      const { rows: existingDislikes } = await pool.query(
        checkDislikeQuery,
        checkDislikeValues
      );

      // Если пользователь уже дизлайкнул пост, удаляем дизлайк и добавляем лайк
      if (existingDislikes.length > 0) {
        const { id } = existingDislikes[0];
        if (id) {
          const deleteDislikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
          const deleteDislikeValues = [id];
          await pool.query(deleteDislikeQuery, deleteDislikeValues);

          const updateDislikesQuery = `
            UPDATE posts
            SET dislikes_count = dislikes_count - 1
            WHERE id = $1;
          `;
          const updateDislikesValues = [postId];
          await pool.query(updateDislikesQuery, updateDislikesValues);
        }
      }

      // Добавляем лайк к посту
      const likeQuery = `
        INSERT INTO likes (post_id, user_name, is_like)
        VALUES ($1, $2, true);
      `;
      const likeValues = [postId, username];
      await pool.query(likeQuery, likeValues);

      const updateLikesQuery = `
        UPDATE posts
        SET likes_count = likes_count + 1
        WHERE id = $1;
      `;
      const updateLikesValues = [postId];
      await pool.query(updateLikesQuery, updateLikesValues);

      return { success: true, message: "Post liked!" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error liking post" };
    }
  };

  static dislikePost = async (postId: number, username: number) => {
    try {
      // Проверяем, лайкнул ли пользователь пост
      const checkLikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = true;
      `;
      const checkLikeValues = [postId, username];
      const { rows: existingLikes } = await pool.query(
        checkLikeQuery,
        checkLikeValues
      );
      // Если пользователь уже лайкнул пост, то удаляем лайк и обновляем счетчик лайков
      if (existingLikes.length > 0) {
        const { id } = existingLikes[0];
        if (id) {
          const deleteLikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
          const deleteLikeValues = [id];
          await pool.query(deleteLikeQuery, deleteLikeValues);
          const updateLikesQuery = `
            UPDATE posts
            SET likes_count = likes_count - 1
            WHERE id = $1;
          `;
          const updateLikesValues = [postId];
          await pool.query(updateLikesQuery, updateLikesValues);
        }
      }
      // Проверяем, дизлайкнул ли пользователь пост
      const checkDislikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = false;
      `;
      const checkDislikeValues = [postId, username];
      const { rows: existingDislikes } = await pool.query(
        checkDislikeQuery,
        checkDislikeValues
      );
      // Если пользователь уже дизлайкнул пост, то удаляем дизлайк и обновляем счетчик дизлайков
      if (existingDislikes.length > 0) {
        const { id } = existingDislikes[0];
        if (id) {
          const deleteDislikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
          const deleteDislikeValues = [id];
          await pool.query(deleteDislikeQuery, deleteDislikeValues);
          const updateDislikesQuery = `
            UPDATE posts
            SET dislikes_count = dislikes_count - 1
            WHERE id = $1;
          `;
          const updateDislikesValues = [postId];
          await pool.query(updateDislikesQuery, updateDislikesValues);
          return { success: true, message: "Dislike deleted" };
        }
      }
      // Если пользователь еще не дизлайкнул пост, то добавляем дизлайк и обновляем счетчик дизлайков
      const dislikeQuery = `
        INSERT INTO likes (post_id, user_name, is_like)
        VALUES ($1, $2, false);
      `;
      const dislikeValues = [postId, username];
      await pool.query(dislikeQuery, dislikeValues);

      const updateDislikesQuery = `
        UPDATE posts
        SET dislikes_count = dislikes_count + 1
        WHERE id = $1;
      `;
      const updateDislikesValues = [postId];
      await pool.query(updateDislikesQuery, updateDislikesValues);
      return { success: true, message: "Post disliked!" };
    } catch (err) {}
  };

  static deleteLikesByPostId = async (username: string) => {
    const deleteLikesQuery = `DELETE FROM likes WHERE post_id = $1`;

    const [posts] = await PostsRepo.selectPostsByUsername(username);
    const deleteCommentsValue = posts.map((post: Post) => post.id);

    deleteCommentsValue.forEach((value) => {
      pool.query(deleteLikesQuery, [value], (err, _res) => {
        if (err) console.log(err);
      });
    });

    return { success: true, message: "Likes deleted successfully" };
  };
}
