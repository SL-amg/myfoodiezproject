const { model, Schema } = require("mongoose");
const Category = require("./Category");

const RecipesSchema = new Schema({
  name: String,
  image: String,
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: "Ingredients",
  }
  ],
  nutritionFact: String,
  video: String,
  creater: String,
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }, // added this

});

module.exports = model("Recipes", RecipesSchema);
