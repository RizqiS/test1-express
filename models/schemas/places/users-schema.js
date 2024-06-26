const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  placesId: [{ type: mongoose.Types.ObjectId, required: true, ref: "places" }],
});

module.exports = mongoose.model("users", userSchema);
