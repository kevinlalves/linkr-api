import db from '../database/database.connection.js';

export const createPost = ({ content, sharedUrl, userId }) =>
  db.query('INSERT into posts (content, shared_url, user_id) values ($1, $2, $3);', [content, sharedUrl, userId]);

export const getPosts = () =>
  db.query(
    `
    SELECT
        p.id AS "postId",
        p.content AS content,
        p.shared_url AS "sharedUrl",
        p.created_at AS "createdAt",
        u.username AS "username",
        u.picture_url AS "pictureUrl",
        coalesce(count(l.id), 0) AS "likesCount"
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN likes l on p.id = l.post_id
    GROUP BY "postId", content, "sharedUrl", "createdAt", username, "pictureUrl"
    ORDER BY "createdAt" DESC
    LIMIT 20;
  `
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
      WHERE hashtags.name = $1
      GROUP BY posts.id
    ) posts JOIN users
      ON users.id = posts.user_id;
    `,
    [hashtag]
  );
};
