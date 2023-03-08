import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id serial PRIMARY KEY,
        email text UNIQUE NOT NULL,
        password text NOT NULL,
        picture_url text NOT NULL,
        username text UNIQUE NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`DROP TABLE users;`);
  } catch (error) {
    return error;
  }
};
