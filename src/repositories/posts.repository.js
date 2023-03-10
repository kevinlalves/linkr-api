import db from '../database/database.connection.js';

export const createPost = ({ content, sharedUrl, userId }) =>
  db.query('INSERT into posts (content, shared_url, user_id) values ($1, $2, $3);', [content, sharedUrl, userId]);

export const getPosts = ({ desc, per, page }) =>
  db.query(
    `
      SELECT
        p.id AS "postId",
        p.content AS content,
        p.shared_url AS "sharedUrl",
        p.created_at AS "createdAt",
        u.username AS "username",
        u.picture_url AS "pictureUrl"
      FROM posts p
      JOIN users u ON p.user_id = u.id

      ORDER BY "createdAt" ${desc ? 'DESC' : 'ASC'}
      OFFSET $1
      LIMIT $2;
  `,
    [per * (page - 1), per]
  );

export const getPostsByHashtag = (hashtag) => {
  return db.query(
    `
    SELECT posts.*, COALESCE(COUNT(likes.id), 0) as likes, users.username, users.picture_url from posts
    LEFT JOIN likes ON likes.post_id = posts.id
    JOIN users ON posts.user_id = users.id
    JOIN hashtag_posts ON hashtag_posts.post_id = posts.id
    JOIN hashtags ON hashtags.id = hashtag_posts.hashtag_id
    WHERE hashtags.name = $1
    GROUP BY posts.id, users.username, users.picture_url
    ORDER BY posts.created_at desc;
    `,
    [hashtag]
  );
};
