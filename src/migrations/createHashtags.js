import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE hashtags (
        id serial PRIMARY KEY,
        name text NOT NULL,
        mentions integer NOT NULL DEFAULT 1,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`DROP TABLE hashtags;`);
  } catch (error) {
    return error;
  }
};
