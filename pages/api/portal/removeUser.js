import { connectDB, middleware } from "../../../util/connectDB";
import nc from "next-connect";
import jwt from "jsonwebtoken";
const User = require("../../../models/User");
const colors = require("colors");

const handler = nc();
handler.use(middleware);
handler.post(async (req, res) => {
  console.log(req.body);
  try {
    return res.json({ msg: "Reached portal removeUser route success" });
  } catch (error) {
    return res.json({ msg: "Reached portal removeUser route catch block" });
  }
});

export default connectDB(handler);
