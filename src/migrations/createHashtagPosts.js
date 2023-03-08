import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE hashtag_posts (
        id serial PRIMARY KEY,
        post_id integer NOT NULL REFERENCES posts ON DELETE CASCADE,
        hashtag_id integer NOT NULL REFERENCES hashtags ON DELETE CASCADE
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`DROP TABLE hashtag_posts;`);
  } catch (error) {
    return error;
  }
};
