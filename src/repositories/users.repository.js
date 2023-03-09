import db from '../database/database.connection.js';

export const getUserBy = (param, value) =>
  db.query(
    `
      SELECT
        id,
        email,
        password,
        username,
        picture_url AS "pictureUrl",
        created_at AS "createdAt"
      from users where ${param} = $1`,
    [value]
  );

export const createUser = ({ email, encryptedPassword, username, pictureUrl }) =>
  db.query('INSERT into users (email, password, username, picture_url) VALUES ($1, $2, $3, $4);', [
    email,
    encryptedPassword,
    username,
    pictureUrl,
  ]);
