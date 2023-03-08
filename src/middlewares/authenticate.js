import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/constants/jwt.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
  if (!token) {
    res.status(401).send();
    return;
  }
  try {
    const { userId } = jwt.verify(token, jwtSecret);
    res.locals = Object.assign({ userId }, res.locals);
  } catch (error) {
    res.status(401).send();
    return;
  }
  next();
};
export default authenticate;
