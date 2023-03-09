import Joi from "joi";

export const hashtagSchema = Joi.object({
  hashtag: Joi.string()
    .required()
});