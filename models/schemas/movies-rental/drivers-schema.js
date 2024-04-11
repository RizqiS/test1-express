const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  postCode: { type: Number, required: true },
  licenceClass: { type: String, required: true, enum: ["A", "B", "C"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("driverLincenses", driverSchema);
