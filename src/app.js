import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.router.js';
import { hashtagRouter } from './routes/hashtag.router.js';
import { postRouter } from './routes/post.router.js';
import { userRouter } from './routes/user.router.js';
dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(json());
app.use(helmet());

app.get('/health-check', (req, res) => res.send());

app.use(authRouter);
app.use('/hashtags', hashtagRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  await import('./database/migrate.js');
}

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
