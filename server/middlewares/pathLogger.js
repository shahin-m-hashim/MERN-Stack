const logger = (req, res, next) => {
  console.log("Requested path:", req.path + "\nRequest Method:", req.method);
  next();
};

module.exports = logger;
