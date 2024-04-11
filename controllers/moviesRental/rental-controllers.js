const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  memberId: [{ type: mongoose.Types.ObjectId, required: true, ref: "members" }],
  movieListId: [{ type: mongoose.Types.ObjectId, required: true, ref: "movieLists" }],
  rentalDate: [{ type: Date, required: true }],
  rentalExpiry: [{ type: Date, required: true }],
  totalCost: [{ type: Number, required: true }],
  createdAt: [{ type: Date, default: Date.now }],
});

module.exports = mongoose.model("rentals", rentalSchema);
