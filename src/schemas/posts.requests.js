import Joi from 'joi';

export const createPostSchema = Joi.object({
  content: Joi.string(),
  sharedUrl: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required(),
});

export const getPostsSchema = Joi.object({
  per: Joi.number().integer().min(1),
  page: Joi.number().integer().min(1),
  desc: Joi.boolean(),
});
