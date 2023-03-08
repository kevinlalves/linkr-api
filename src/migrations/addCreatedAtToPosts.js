import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      ALTER TABLE posts
      ADD COLUMN created_at timestamptz NOT NULL DEFAULT now()
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`
      ALTER TABLE posts
      DROP COLUMN created_at;
    `);
  } catch (error) {
    return error;
  }
};
