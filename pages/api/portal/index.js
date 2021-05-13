import nc from "next-connect";
import middleware from "../../../util/connectDB";

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  res.json({ msg: "Reached portal index route" });
});

export default handler;
