import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { signinSchema, signupSchema } from '../schemas/auth.requests.js';

const router = new Router();

router.post('/sign-in', processRequestParams(signinSchema), signIn);
router.post('/sign-up', processRequestParams(signupSchema), signUp);

export { router as authRouter };
