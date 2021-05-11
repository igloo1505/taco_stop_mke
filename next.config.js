const path = require("path");
module.exports = {
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    MONGO_URI:
      "mongodb+srv://tacoStopMKE:TacoStopMilwaukee@development.bo7q9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  },
};
