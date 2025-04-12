import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const validationError = createHttpError(400, 'Validation failed', {
        errors: error.details,
      });
      next(validationError);
    }
  };
  return func;
};
