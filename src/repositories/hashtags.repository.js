import db from "../database/database.connection.js";

export const getFirstTenMostMentionedHashtags = () => {
  return db.query('SELECT name FROM hashtags ORDER BY mentions LIMIT 10');
};