const express = require("express");
const { emptyCheck, numberCheck } = require("../utils/validation");
const {
  createProducts,
  updateProducts,
  getProducts,
  getProductById,
  deleteProducts,
} = require("../controllers/mongooseProducts-controller");

const routers = express.Router();

routers.get("/", getProducts);
routers.get("/:productId", getProductById);
routers.delete("/:productId", deleteProducts);
routers.patch("/:productId", [emptyCheck("name"), numberCheck("price")], updateProducts);
routers.post("/", [emptyCheck("name"), numberCheck("price")], createProducts);

module.exports = routers;
