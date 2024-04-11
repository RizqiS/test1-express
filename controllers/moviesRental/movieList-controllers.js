const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  movieId: [{ type: mongoose.Types.ObjectId, required: true, ref: "movies" }],
});

module.exports = mongoose.model("movieLists", rentalSchema);
