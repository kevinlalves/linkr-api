import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE likes (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
        post_id integer NOT NULL REFERENCES posts ON DELETE CASCADE,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`DROP TABLE likes;`);
  } catch (error) {
    return error;
  }
};
