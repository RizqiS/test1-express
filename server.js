const express = require("express");
const bodyParser = require("body-parser");
const productRouters = require("./routers/products-routers");
const HttpError = require("./models/HttpError");
const app = express();

app.use(bodyParser.json());
app.use("/api/product", productRouters);

app.use(async (req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message, code: error.code });
});

app.listen(process.env.PORT || 5000);
