import db from '../database/database.connection.js';

export const createPost = ({ content, sharedUrl, userId }) =>
  db.query('INSERT into posts (content, shared_url, user_id) values ($1, $2, $3);', [content, sharedUrl, userId]);

export const getPosts = ({ desc, per, page }) =>
  db.query(
    `
    SELECT * FROM posts
    ORDER BY created_at ${desc ? 'DESC' : 'ASC'}
    OFFSET $1
    LIMIT $2;
  `,
    [per * (page - 1), per]
  );
