const { model, Schema } = require("mongoose");

const ingredientsSchema = new Schema({
  name: String,
  scale: String,
  amount: String,
  Recipes: [{
    type: Schema.Types.ObjectId,
    ref: "Recipes",
  }
  ],
});

module.exports = model("Ingredients", ingredientsSchema);
