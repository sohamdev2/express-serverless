module.exports = (req, res, next) => {
  if (!JSON.parse(req.apiGateway?.event?.body)?.name) {
    return res.status(400).send(`Required parameter 'name'`);
  }
  next();
};
