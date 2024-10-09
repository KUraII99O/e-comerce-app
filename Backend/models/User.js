const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String }, // Ensure id is a string
  email: String,
  username: String,
  password: String,
  type: String,
  name: String,
  mobile: String,
  userId: String,
});

module.exports = mongoose.model("User", userSchema);
