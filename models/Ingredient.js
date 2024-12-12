const { model, Schema } = require("mongoose");

const IngredientSchema = new Schema({
  name: String,
  scale: String,
  amount: String,

});

module.exports = model("Ingredient", IngredientSchema);
