module.exports = (req, _, next) => {
  if (!req.body?.name) {
    return next(new Error(`Required parameter name`));
  }
  next();
};
