const mongoose = require("mongoose");
const nc = require("next-connect");
import authMiddleware from "./authMiddleware";
const colors = require("colors");

const connectDB = (handler) => async (req, res) => {
  console.log(colors.bgCyan.black("Running connectDB()"));
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      return handler(req, res);
    });
};

const middleware = nc();
// middleware.use(database);
middleware.use(connectDB);
// middleware.use(authMiddleware);
module.exports = {
  connectDB,
  middleware,
};
