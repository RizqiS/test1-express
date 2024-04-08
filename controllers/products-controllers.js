const { validationResult } = require("express-validator");
const mongodb = require("mongodb");
const HttpError = require("../models/HttpError");
const apiMongoDB =
  "mongodb+srv://rizqi:jQxpLZyxbhjLvP8f@atlascluster.yccwwdp.mongodb.net/products_db?retryWrites=true&w=majority&appName=AtlasCluster";

async function createProducts(req, res, next) {
  const errorsValidation = validationResult(req);
  if (!errorsValidation.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  let product = {
    name: req.body.name,
    price: parseInt(req.body.price),
  };

  const client = new mongodb.MongoClient(apiMongoDB);
  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").insertOne(product);
  } catch (errors) {
    return next(errors);
  }

  client.close();
  res.status(201).json({ product });
}

async function getProducts(req, res, next) {
  const client = new mongodb.MongoClient(apiMongoDB);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (errors) {
    return next(errors);
  }
  client.close();
  res.json({ products });
}

exports.createProducts = createProducts;
exports.getProducts = getProducts;
