import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query(`
      ALTER TABLE hashtags
      DROP COLUMN mentions;
    `);
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query(`
      ALTER TABLE hashtags
      ADD COLUMN mentions integer NOT NULL DEFAUL 1;
    `);
  } catch (error) {
    return error;
  }
};
