import sanitizeObject from '../utils/functions/sanitizeObject.js';

const processRequestParams = (schema) => {
  return (req, res, next) => {
    req.Params = sanitizeObject({ ...req.body, ...req.params, ...req.query });
    const { error } = schema.validate(req.Params, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return res.status(422).send(errorMessages);
    }

    next();
  };
};

export default processRequestParams;
