export const notFoundHandler = (req, res) => {
  res.status(404).json({
    messege: `${req.url} not found`,
  });
};
