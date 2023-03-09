import chalk from 'chalk';
import { getFirstTenMostMentionedHashtags } from '../repositories/hashtags.repository.js';
import { getPostsByHashtag } from '../repositories/posts.repository.js';
import internalError from '../utils/functions/internalError.js';

export const getTrending = async (req, res) => {
  console.log(chalk.cyan('GET /hashtags/trending'));

  try {
    const { rows: trending } = await getFirstTenMostMentionedHashtags();

    res.send(trending);
  } catch (error) {
    internalError(error, res);
  }
};

export const getHashtagPosts = async (req, res) => {
  const { hashtag } = req.Params;

  console.log(chalk.cyan(`GET /hashtags/${hashtag}`));
  try {
    const { rows: posts } = await getPostsByHashtag(hashtag);
    if (!posts.length) {
      res.status(404).send('Hashtag not found');
      return;
    }

    res.send(posts);
  } catch (error) {
    internalError(error, res);
  }
};
