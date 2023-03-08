import { Router } from 'express';
import { userMe } from '../controllers/auth.controller.js';
import authenticate from '../middlewares/authenticate.js';

const router = new Router();

router.get('/user/me', authenticate, userMe);

export { router as userRouter };
