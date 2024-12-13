const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
  recipes: [
    {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  }
  ], // added this 
  ingredients: [
    {
    type: Schema.Types.ObjectId,
    ref: "Ingredient",
  }
  ], // added this 
}
);

module.exports = model("Category", CategorySchema);
