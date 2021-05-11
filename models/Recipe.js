const mongoose = require("mongoose");
const categoryArray = [
    "speciality",
    "side",
    "drink",
    "tacoIngredients"
];

const RecipeSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

RecipeSchema.pre("save", async (next, done) {
    if(!categoryArray.includes(this.category)){
        var err = new Error("category is not valid")
        next(err)
    }
    else {
        next()
    }
})

module.exports = mongoose.model("Recipe", RecipeSchema);
