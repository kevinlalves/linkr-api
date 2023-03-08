import chalk from 'chalk';
import { createUser, getUserBy } from '../repositories/users.repository.js';
import internalError from '../utils/functions/internalError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtTokenDuration } from '../utils/constants/jwt.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { saltRounds } from '../utils/constants/bcrypt.js';

export const signIn = async (req, res) => {
  const { email, password } = req.Params;

  console.log(chalk.cyan('POST /sign-in'));
  try {
    const { rows: [user], } = await getUserBy('email', email);
    if (!user) {
     
      res.status(401).send('Invalid credentials');
      return;
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).send('Invalid credentials');
      return;
    }
   
    const token = "testeToken"
    //jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: jwtTokenDuration });
    console.log(user)
    res.send({ token, user});
  } catch (error) {
    internalError(error, res);
  }
};

export const signUp = async (req, res) => {
  const { email, password, username, pictureUrl } = req.Params;

  console.log(chalk.cyan('POST /sign-up'));
  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    await createUser({ email, encryptedPassword, username, pictureUrl });

    res.status(201).send();
  } catch (error) {
    if (error.code === valueAlreadyExistsError) {
      res.status(409).send('User already exists');
      return;
    }

    internalError(error, res);
  }
};
