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
