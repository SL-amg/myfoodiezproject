const { model, Schema } = require("mongoose");

const IngredientSchema = new Schema({
  name: String,
  scale: String,
  amount: String,
  image: String,
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = model("Ingredient", IngredientSchema);
