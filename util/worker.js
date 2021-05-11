const worker = (req, res, next) => {
  console.log("Running worker file");
  next();
};

module.exports = worker;
