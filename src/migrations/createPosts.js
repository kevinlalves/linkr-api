import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE posts (
        id serial PRIMARY KEY,
        content text NOT NULL,
        shared_url text NOT NULL,
        user_id integer NOT NULL REFERENCES users ON DELETE CASCADE
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`DROP TABLE posts;`);
  } catch (error) {
    return error;
  }
};
