import nc from "next-connect";
import { connectDB } from "../../../../util/connectDB";
import AddOn from "../../../../models/AddOn";
import Protein from "../../../../models/Protein";
import Topping from "../../../../models/Topping";
import Tortilla from "../../../../models/Tortilla";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const {
      Type: name,
      "In Stock": isInStock,
      "Gluten Free": isGlutenFree,
      "Is Spicy": isHot,
      dataType,
      Description: description,
      Price: price,
    } = req.body;
    console.table(req.body);
    switch (dataType) {
      case "Tortilla":
        const tortilla = new Tortilla({
          name: name,
          isGlutenFree: isGlutenFree,
          isInStock: isInStock,
        });
        await tortilla.save();
        return res.json(tortilla);
    }
    return res.json(req.body);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

handler.get(async (req, res) => {
  try {
    const addOns = await AddOn.find({});
    const proteins = await Protein.find({});
    const toppings = await Topping.find({});
    const tortillas = await Tortilla.find({});
    return res.json({
      addOns,
      proteins,
      toppings,
      tortillas,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default connectDB(handler);
