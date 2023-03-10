import chalk from 'chalk';
import urlMetadata from 'url-metadata';
import { addHashtagName, addHashtagPost, searchHashtagName } from '../repositories/hashtags.repository.js';
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
  const hashtags = content
    .split(' ')
    .filter((str) => str[0] === '#' && str.length > 1)
    .map((str) => str.slice(1));

  console.log(chalk.cyan('POST /posts'));
  try {
    const { rows: posts } = await createPost({ content, sharedUrl, userId });
    for (const hashtag of hashtags) {
      const { rows } = await searchHashtagName(hashtag);
      let id = rows[0]?.id;
      if (!id) {
        const { rows } = await addHashtagName(hashtag);
        id = rows[0].id;
      }

      await addHashtagPost(id, posts[0].id);
    }
    res.sendStatus(201);
  } catch (error) {
    if (error.code === foreingKeyConstraint) {
      res.status(401).send('Invalid user');
      return;
    }

    internalError(error, res);
  }
};
