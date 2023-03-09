import chalk from 'chalk';
import { getUserBy } from '../repositories/users.repository.js';
import { userSerializer } from '../serializers/user.serializer.js';
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

    res.send(userSerializer({ user }));
  } catch (error) {
    internalError(error, res);
  }
};
