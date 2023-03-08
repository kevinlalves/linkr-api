import Joi from 'joi';

const idOnlySchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export default idOnlySchema;
