import nc from "next-connect";

import middleware from "../../../util/connectDB";

// const handler = (req, res) => {

// }

const handler = nc();
handler.use(middleware);

handler.get(async (req, res) => {
  console.log("Running get function");
  res.json({ msg: "ahh fuck this is a struggle" });
});

export default handler;
