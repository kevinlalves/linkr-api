import dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.SECRET_KEY;
export const jwtTokenDuration = 60 * 60 * 24;
