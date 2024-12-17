const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
  username: {
    type: String,
    unique: true,
  }, // make it a unique username
  name: String,
  password: String,
  image: String,
});

module.exports = model("Account", accountSchema);
