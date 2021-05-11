const { MongoClient } = require("mongodb");
// const { connect } = require("mongodb");
const mongoose = require("mongoose");
const nc = require("next-connect");

// const connectDB = async (req, res, next) => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("MongoDB Connected"));
//   next();
// };

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  console.log("Running connect function...");
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("development");
  return next();
}

const middleware = nc();
middleware.use(database);

// export default middleware;
module.exports = middleware;
