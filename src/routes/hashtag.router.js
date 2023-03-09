import { Router } from "express";
import { getTrending } from "../controllers/hashtag.controller.js";
import authenticate from "../middlewares/authenticate.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { hashtagSchema } from "../schemas/hashtag.requests.js";

const router = Router();

router.get('/hashtag/trending', authenticate, getTrending);
router.get('/hashtag/:hashtag', processRequestParams(hashtagSchema), getTrending);

export { router as hashtagRouter };