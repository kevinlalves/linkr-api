import chalk from 'chalk';
import { getUserBy } from '../repositories/users.repository.js';
import internalError from '../utils/functions/internalError.js';

export const getCurrentUser = async (req, res) => {
  const { userId } = req.Params;

  console.log(chalk.cyan('GET /users/me'));
  try {
    const {
      rows: [user],
    } = await getUserBy('id', userId);
    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    res.json({
      id: user.id,
      pictureUrl: user.picture_url,
      createdAt: user.created_at,
      username: user.username,
    });
  } catch (error) {
    internalError(error, res);
  }
};
