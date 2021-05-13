const mongoose = require("mongoose");
// const User = require("../../../models/User");
import nc from "next-connect";
import middleware, { connectDB } from "../../../util/connectDB";
// import User from "../../../models/User";
// import User from "../../../models/User";
const User = require("../../../models/User");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  console.log("Reached backend with: ", req.body);
  try {
    let user = new User({
      userName: req.body.email,
      password: req.body.password,
    });
    // let user = {
    //   username: req.body.email,
    //   password: req.body.password,
    // };
    console.log("USER!!!", user);
    // const newUser = user;
    const newUser = await user.save();
    console.log("User Saved!!: ", user);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error adding that user." });
  }
});

export default connectDB(handler);
