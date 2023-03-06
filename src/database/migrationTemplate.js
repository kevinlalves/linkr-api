import db from '../database/database.connection.js';

export const up = async () => {
  try {
    await db.query();
  } catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query();
  } catch (error) {
    return error;
  }
};
