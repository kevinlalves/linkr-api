import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    res.status(401).send();
    return;
  }
  try {
    const { userId } = jwt.verify(token, jwtSecret);
    req.Params = { userId, ...req.Params };
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};
export default authenticate;
