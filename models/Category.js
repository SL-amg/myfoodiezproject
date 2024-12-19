const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
  image: String,
  recipes: [
    {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  }
  ], // added this 
  
}
);

module.exports = model("Category", CategorySchema);
