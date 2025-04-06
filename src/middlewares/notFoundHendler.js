export const notFoundHandler = (reg, res) => {
  res.status(404).json({
    messege: `${reg.url} not found`,
  });
};
