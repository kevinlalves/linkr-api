import { Router } from 'express';
import { getHashtagPosts, getTrending } from '../controllers/hashtags.controller.js';
import authenticate from '../middlewares/authenticate.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { hashtagSchema } from '../schemas/hashtag.requests.js';

const router = new Router();

router.get('/trending', authenticate, getTrending);
router.get('/:hashtag', processRequestParams(hashtagSchema), authenticate, getHashtagPosts);

export { router as hashtagRouter };
