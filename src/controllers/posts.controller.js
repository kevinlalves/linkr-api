import chalk from 'chalk';
import { createPost, getPosts } from '../repositories/posts.repository.js';
import { foreingKeyConstraint } from '../utils/constants/postgres.js';
import { standardPostsBatch } from '../utils/constants/queries.js';
import internalError from '../utils/functions/internalError.js';

export const getPostsController = async (req, res) => {
  const { desc = true, per = standardPostsBatch, page = 1 } = req.Params;

  console.log(chalk.cyan('GET /posts'));
  try {
    const { rows: posts } = await getPosts({ desc, per, page });

    res.json(posts);
  } catch (error) {
    internalError(error, res);
  }
};

export const createPostController = async (req, res) => {
  const { content, sharedUrl, userId } = req.Params;

  console.log(chalk.cyan('POST /posts'));
  try {
    await createPost({ content, sharedUrl, userId });

    res.status(201).send();
  } catch (error) {
    if (error.code === foreingKeyConstraint) {
      res.status(401).send('Invalid user');
      return;
    }

    internalError(error, res);
  }
};
