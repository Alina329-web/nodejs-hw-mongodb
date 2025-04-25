import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      // const validationError = createHttpError(400, 'Validation failed', {
      //   errors: error.details,
      // });
      const validationError = createHttpError(400, 'BadRequestError');
      validationError.data = {
        message: 'Bad Request',
        errors: error.details.map((err) => ({
          message: err.message,
          patch: err.patch,
          type: err.type,
          context: err.context,
        })),
      };
      next(validationError);
    }
  };
  return func;
};
