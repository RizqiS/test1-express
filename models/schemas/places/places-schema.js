const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

module.exports = mongoose.model("places", placesSchema);
