import chalk from 'chalk';
import urlMetadata from 'url-metadata';
import { searchHashtagName } from '../repositories/hashtags.repository.js';
import { createPost, getPosts } from '../repositories/posts.repository.js';
import { foreingKeyConstraint } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';

export const getPostsController = async (req, res) => {
  console.log(chalk.cyan('GET /posts'));
  try {
    const { rows } = await getPosts();

    const posts = await Promise.all(
      rows.map((post) => {
        return urlMetadata(post.sharedUrl).then(
          (metadata) => {
            const { url, title, image, description } = metadata;
            return { ...post, url, title, image, description };
          },
          (err) => {
            console.log(err);
            return { ...post };
          }
        );
      })
    );

    res.send(posts);
  } catch (error) {
    internalError(error, res);
  }
};

export const createPostController = async (req, res) => {
  const { content, sharedUrl, userId } = req.Params;
  const hashtags = content.split(' ').filter((str) => str[0] === '#');
  console.log(chalk.cyan('POST /posts'));
  try {
    await createPost({ content, sharedUrl, userId });
    for (const hashtag of hashtags) {
      const data = await searchHashtagName(hashtag);
      console.log(data);
    }
    res.status(201).send();
  } catch (error) {
    if (error.code === foreingKeyConstraint) {
      res.status(401).send('Invalid user');
      return;
    }

    internalError(error, res);
  }
};
