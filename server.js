const express = require("express");
const HttpError = require("./models/HttpError");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRouters = require("./routers/products-routers");
const driverLicenceRouters = require("./routers/driverLicense-routers");
const memberRouters = require("./routers/member-routes");

const app = express();
const apiMongoDB =
  "mongodb+srv://rizqi:jQxpLZyxbhjLvP8f@atlascluster.yccwwdp.mongodb.net/products_db?retryWrites=true&w=majority&appName=AtlasCluster";

app.use(bodyParser.json());
app.use("/api/product", productRouters);
app.use("/api/license", driverLicenceRouters);
app.use("/api/member", memberRouters);

app.use(async (req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message, code: error.code });
});

mongoose
  .connect(apiMongoDB)
  .then(() => {
    console.log("connect database");
    app.listen(process.env.PORT || 5000);
  })
  .catch(() => console.log("failed connect database"));
