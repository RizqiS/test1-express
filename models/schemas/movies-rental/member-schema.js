const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  firstName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  email: { type: String, required: true },
  nameBank: { type: String, required: true },
  accountNo: { type: Number, required: true },
  driverId: { type: mongoose.Types.ObjectId, required: true, ref: "driverLincenses" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("members", memberSchema);
