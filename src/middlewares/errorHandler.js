// export const errorHandler = (error, req, res, next) => {
//   const { status = 500, message = 'Something went wrong', errors = [] } = error;
//   res.status(status).json({
//     message,
//     errors,
//   });
// };
export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const data = error.data || null;

  res.status(status).json({
    status: String(status),
    message,
    ...(data && { data }), // додаємо data тільки якщо вона є
  });
};
