const mongoose = require("mongoose");

const movieListSchema = new mongoose.Schema({
  movieId: [{ type: mongoose.Types.ObjectId, required: true, ref: "movies" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("movieLists", movieListSchema);
