"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesRepo = void 0;
const client_1 = require("../database/client");
class LikesRepo {
    static likePost = async (postId, username) => {
        try {
            // Проверяем, лайкнул ли пользователь уже пост
            const checkLikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = true;
      `;
            const checkLikeValues = [postId, username];
            const { rows: existingLikes } = await client_1.pool.query(checkLikeQuery, checkLikeValues);
            // Если пользователь уже лайкнул пост, удаляем лайк
            if (existingLikes.length > 0) {
                const { id } = existingLikes[0];
                if (id) {
                    const deleteLikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
                    const deleteLikeValues = [id];
                    await client_1.pool.query(deleteLikeQuery, deleteLikeValues);
                    const updateLikesQuery = `
            UPDATE posts
            SET likes_count = likes_count - 1
            WHERE id = $1;
          `;
                    const updateLikesValues = [postId];
                    await client_1.pool.query(updateLikesQuery, updateLikesValues);
                    return { success: true, message: "Like deleted" };
                }
            }
            // Проверяем, поставил ли пользователь дизлайк посту
            const checkDislikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = false;
      `;
            const checkDislikeValues = [postId, username];
            const { rows: existingDislikes } = await client_1.pool.query(checkDislikeQuery, checkDislikeValues);
            // Если пользователь уже дизлайкнул пост, удаляем дизлайк и добавляем лайк
            if (existingDislikes.length > 0) {
                const { id } = existingDislikes[0];
                if (id) {
                    const deleteDislikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
                    const deleteDislikeValues = [id];
                    await client_1.pool.query(deleteDislikeQuery, deleteDislikeValues);
                    const updateDislikesQuery = `
            UPDATE posts
            SET dislikes_count = dislikes_count - 1
            WHERE id = $1;
          `;
                    const updateDislikesValues = [postId];
                    await client_1.pool.query(updateDislikesQuery, updateDislikesValues);
                }
            }
            // Добавляем лайк к посту
            const likeQuery = `
        INSERT INTO likes (post_id, user_name, is_like)
        VALUES ($1, $2, true);
      `;
            const likeValues = [postId, username];
            await client_1.pool.query(likeQuery, likeValues);
            const updateLikesQuery = `
        UPDATE posts
        SET likes_count = likes_count + 1
        WHERE id = $1;
      `;
            const updateLikesValues = [postId];
            await client_1.pool.query(updateLikesQuery, updateLikesValues);
            return { success: true, message: "Post liked!" };
        }
        catch (err) {
            console.error(err);
            return { success: false, message: "Error liking post" };
        }
    };
    static dislikePost = async (postId, username) => {
        try {
            // Проверяем, лайкнул ли пользователь пост
            const checkLikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = true;
      `;
            const checkLikeValues = [postId, username];
            const { rows: existingLikes } = await client_1.pool.query(checkLikeQuery, checkLikeValues);
            // Если пользователь уже лайкнул пост, то удаляем лайк и обновляем счетчик лайков
            if (existingLikes.length > 0) {
                const { id } = existingLikes[0];
                if (id) {
                    const deleteLikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
                    const deleteLikeValues = [id];
                    await client_1.pool.query(deleteLikeQuery, deleteLikeValues);
                    const updateLikesQuery = `
            UPDATE posts
            SET likes_count = likes_count - 1
            WHERE id = $1;
          `;
                    const updateLikesValues = [postId];
                    await client_1.pool.query(updateLikesQuery, updateLikesValues);
                }
            }
            // Проверяем, дизлайкнул ли пользователь пост
            const checkDislikeQuery = `
        SELECT id FROM likes
        WHERE post_id = $1 AND user_name = $2 AND is_like = false;
      `;
            const checkDislikeValues = [postId, username];
            const { rows: existingDislikes } = await client_1.pool.query(checkDislikeQuery, checkDislikeValues);
            // Если пользователь уже дизлайкнул пост, то удаляем дизлайк и обновляем счетчик дизлайков
            if (existingDislikes.length > 0) {
                const { id } = existingDislikes[0];
                if (id) {
                    const deleteDislikeQuery = `
            DELETE FROM likes
            WHERE id = $1;
          `;
                    const deleteDislikeValues = [id];
                    await client_1.pool.query(deleteDislikeQuery, deleteDislikeValues);
                    const updateDislikesQuery = `
            UPDATE posts
            SET dislikes_count = dislikes_count - 1
            WHERE id = $1;
          `;
                    const updateDislikesValues = [postId];
                    await client_1.pool.query(updateDislikesQuery, updateDislikesValues);
                    return { success: true, message: "Dislike deleted" };
                }
            }
            // Если пользователь еще не дизлайкнул пост, то добавляем дизлайк и обновляем счетчик дизлайков
            const dislikeQuery = `
        INSERT INTO likes (post_id, user_name, is_like)
        VALUES ($1, $2, false);
      `;
            const dislikeValues = [postId, username];
            await client_1.pool.query(dislikeQuery, dislikeValues);
            const updateDislikesQuery = `
        UPDATE posts
        SET dislikes_count = dislikes_count + 1
        WHERE id = $1;
      `;
            const updateDislikesValues = [postId];
            await client_1.pool.query(updateDislikesQuery, updateDislikesValues);
            return { success: true, message: "Post disliked!" };
        }
        catch (err) { }
    };
    static deleteLikesByUsername = async (username) => {
        const [posts] = await this.selectLikesByUsername(username);
        const deleteLikesQuery = `DELETE FROM likes WHERE user_name = $1`;
        const deleteLikesValue = posts.map((post) => post.user_name);
        deleteLikesValue.forEach((value) => {
            client_1.pool.query(deleteLikesQuery, [value], (err, _res) => {
                if (err)
                    console.log(err);
            });
        });
    };
    static selectLikesByUsername = async (username) => {
        const selectLikesQuery = `SELECT * FROM likes WHERE user_name = $1`;
        const selectLikesValue = [username];
        const { rows: likes } = await client_1.pool.query(selectLikesQuery, selectLikesValue);
        return [likes];
    };
}
exports.LikesRepo = LikesRepo;
