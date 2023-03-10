import db from '../database/database.connection.js';

export const createPost = ({ content, sharedUrl, userId }) =>
  db.query('INSERT INTO posts (content, shared_url, user_id) VALUES($1, $2, $3) RETURNING id;', [
    content,
    sharedUrl,
    userId,
  ]);

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
    JOIN hashtag_posts ON hashtag_posts.post_id = posts.id
    JOIN hashtags ON hashtags.id = hashtag_posts.hashtag_id
    WHERE hashtags.name = $1
    GROUP BY "postId", content, "sharedUrl", "createdAt", username, "pictureUrl"
    ORDER BY "createdAt" DESC
    LIMIT 20;
    `,
    [hashtag]
  );
};
