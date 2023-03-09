import db from "../database/database.connection.js";
import db from '../database/database.connection.js';

export const createPost = ({ content, sharedUrl, userId }) =>
  db.query('INSERT into posts (content, shared_url, user_id) values ($1, $2, $3);', [content, sharedUrl, userId]);

export const getPosts = ({ desc, per, page }) =>
  db.query(
    `
      SELECT
        id,
        content,
        shared_url AS "sharedUrl",
        user_id AS "userId",
        created_at AS "createdAt"
      FROM posts
      ORDER BY created_at ${desc ? 'DESC' : 'ASC'}
      OFFSET $1
      LIMIT $2;
  `,
    [per * (page - 1), per]
  );

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