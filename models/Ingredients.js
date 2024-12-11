const { model, Schema } = require("mongoose");

const ingredientsSchema = new Schema({
  name: String,
  scale: String,
  amount: String,
});

module.exports = model("Ingredients", ingredientsSchema);
