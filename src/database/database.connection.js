import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const db = new Pool(
  Object.assign(
    { connectionString: `${process.env.DATABASE_URL}` },
    process.env.NODE_ENV === 'production' && {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  )
);

export default db;
