import { Router } from 'express';
import { getCurrentUser } from '../controllers/users.controller.js';
import authenticate from '../middlewares/authenticate.js';

const router = new Router();

router.get('/me', authenticate, getCurrentUser);

export { router as userRouter };
