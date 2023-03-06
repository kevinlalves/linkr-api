import Joi from 'joi';

const idOnlySchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export default idOnlySchema;
