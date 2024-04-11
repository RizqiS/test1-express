const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  memberId: [{ type: mongoose.Types.ObjectId, required: true, ref: "members" }],
  movieListId: [{ type: mongoose.Types.ObjectId, required: true, ref: "movieLists" }],
  totalCost: { type: Number, required: true },
  rentalDate: { type: Date, required: true },
  rentalExpiry: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("rentals", rentalSchema);
