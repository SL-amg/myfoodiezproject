const { model, Schema } = require("mongoose");

const IngredientSchema = new Schema({
  name: String,
  scale: String,
  amount: String,
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    }
  ],

});

module.exports = model("Ingredient", IngredientSchema);
