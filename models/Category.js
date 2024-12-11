const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  Recipes: [{
    type: Schema.Types.ObjectId,
    ref: "Recipes",
  }
  ], // added this 
}
);

module.exports = model("Category", categorySchema);
