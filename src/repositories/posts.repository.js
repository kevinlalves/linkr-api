import db from "../database/database.connection.js";

export const getPostsByHashtag = (hashtag) => {
  return db.query(
    `
    SELECT users.username, users.picture_url , posts.content, posts.shared_url, posts.likes
    FROM  (
      SELECT posts.content as content, posts.shared_url, posts.user_id, count(likes.post_id) as likes
      FROM posts 
      JOIN likes
        ON likes.post_id = posts.id
      JOIN hashtag_posts
        ON hashtag_posts.post_id = posts.id
      JOIN hashtags
        ON hashtags.id = hashtag_posts.hashtag_id
      WHERE hashtags.id = $1
      GROUP BY posts.id
    ) posts JOIN users
      ON users.id = posts.user_id;
    `,
    [hashtag]
  );
};