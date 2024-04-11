const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  distributor: { type: String, required: true },
  director: { type: String, required: true },
  genre: [{ id: mongoose.Types.ObjectId, name: String }],
  ranting: { type: Number, required: true },
  yearOfRelease: { type: Number, required: true },
  rentalCost: { type: Number, required: true },
  rentalDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("movies", movieSchema);
