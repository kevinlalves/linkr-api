import db from '../database/database.connection.js';

export const getFirstTenMostMentionedHashtags = () => {
  return db.query(
    `
    SELECT h.name, COUNT(hp.post_id) count
    FROM hashtags h
    JOIN hashtag_posts hp on h.id = hp.hashtag_id
    GROUP BY h.name
    ORDER BY count
    LIMIT 10;
    `
  );
};

export const searchHashtagName = (hashtag) => {
  return db.query('SELECT id FROM hashtags WHERE name = $1;', [hashtag]);
};

export const addHashtagName = (hashtag) => {
  return db.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id;', [hashtag]);
};

export const addHashtagPost = (hashtagId, postId) => {
  return db.query(`INSERT INTO hashtag_posts (hashtag_id, post_id) VALUES ($1, $2);`, [hashtagId, postId]);
};
