// const mongoose = require("mongoose");
import nc from "next-connect";
import { middleware, connectDB } from "../../../util/connectDB";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
var colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  console.log(colors.bgBlue("Did run in route..."));
  try {
    const user = await User.findOne({ userName: req.body.email });
    // const { isMatch } = await User.findOne({
    //   userName: req.body.email,
    // }).comparePassword(req.body.password);
    let isMatch = true;
    // const { isMatch } = await user.comparePassword(req.body.password);
    console.log(colors.red("IsMatch!!!"), isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "These passwords do not match." });
    }
    if (isMatch) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ userID: user._id, token });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error adding that user." });
  }
});

export default connectDB(handler);
