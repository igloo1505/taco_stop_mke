import nc from "next-connect";
import { middleware, connectDB } from "../../../util/connectDB";
import User from "../../../models/User";

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  res.json({ msg: "Reached portal index route" });
});
handler.get(async (req, res) => {
  console.log("Did run in GET handler");
  try {
    let user = await User.find({});
    console.log("user...", user);
    let arr = [];
    for (var i = 0; i < user.length; i++) {
      let x = user[i]._doc;
      x = { ...x, password: null };
      arr.push(x);
    }
    console.log("arr", arr);
    return res.json({
      user: arr,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default connectDB(handler);
