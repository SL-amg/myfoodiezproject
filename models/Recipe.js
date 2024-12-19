const { model, Schema } = require("mongoose");
const Category = require("./Category");
const Account = require("./Account");

const RecipeSchema = new Schema({
  name: { type: String },
  image: String,
  nutritionFact: String,
  video: String,
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }, 
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = model("Recipe", RecipeSchema);
