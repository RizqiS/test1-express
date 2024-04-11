const validator = require("express-validator");
const Products = require("../models/schemas/store/products-schema");
const HttpError = require("../models/HttpError");

async function createProducts(req, res, next) {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const products = new Products({
    name: req.body.name,
    price: req.body.price,
  });
  const data = await products.save();
  res.status(201).json({ data });
}

async function updateProducts(req, res, next) {
  const validation = validator.validationResult(req);
  if (!validation.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }
  const { productId } = req.params;
  const product = await Products.findByIdAndUpdate(productId, { ...req.body }, { runValidators: true, new: true });
  res.json({ product });
}
async function getProducts(req, res, next) {
  const products = await Products.find().exec();
  res.json({ products });
}
async function getProductById(req, res, next) {
  const { productId } = req.params;
  const products = await Products.findById(productId).exec();
  //   const productsList = await Products.find().exec();
  //   const products = productsList.find((p) => p._id.toString().includes(productId));

  res.json(products);
}
async function deleteProducts(req, res, next) {
  const { productId } = req.params;
  await Products.findByIdAndDelete(productId).exec();
  res.status(201).json({ message: "delete success" });
}

exports.createProducts = createProducts;
exports.updateProducts = updateProducts;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.deleteProducts = deleteProducts;
