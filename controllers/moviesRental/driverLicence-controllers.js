const HttpError = require("../../models/HttpError");
const validator = require("express-validator");
const DriverLicence = require("../../models/schemas/movies-rental/drivers-schema");
const Member = require("../../models/schemas/movies-rental/member-schema");
const { default: mongoose } = require("mongoose");
async function createDriverLicense(req, res, next) {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { firstName, lastName, address, licenceClass, postCode } = req.body;
  const createDriverLicence = new DriverLicence({
    firstName,
    lastName,
    address,
    licenceClass,
    postCode: parseInt(postCode),
  });

  try {
    await createDriverLicence.save();
  } catch (err) {
    return next(new HttpError("could not create data, please try again", 500));
  }

  res.status(201).json({ createDriverLicence });
}

async function updateDriverLicense(req, res, next) {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { driverId } = req.params;

  let driverLicence;

  try {
    driverLicence = await DriverLicence.findByIdAndUpdate(
      driverId,
      { ...req.body },
      { new: true, runValidators: true }
    );
  } catch (err) {
    return next(new HttpError("could not update data, please try again", 500));
  }

  if (!driverLicence) {
    return next(new HttpError("could not find for id", 404));
  }

  res.status(201).json({ driverLicence });
}

async function deleteDriverLicense(req, res, next) {
  const { driverId } = req.params;

  let driverLicense;
  try {
    driverLicense = await DriverLicence.findById(driverId);
  } catch (err) {
    return next(new HttpError("error delete data [1], please try again", 500));
  }

  if (!driverLicense) {
    return next(new HttpError("could not find for id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await DriverLicence.findByIdAndDelete(driverId, { session: sess });
    await Member.deleteMany({ driverId }, { session: sess });
    sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("something went wrong [2], please try again", 500));
  }

  res.status(201).json({ message: "delete drive is success" });
}

async function getAllDriverLicense(req, res, next) {
  let userDriver;

  try {
    userDriver = await DriverLicence.find();
  } catch (err) {
    return next(new HttpError("could not get data, please try again", 500));
  }

  if (!userDriver || userDriver.length === 0) {
    return next(new HttpError("could not find driver licence", 404));
  }

  res.json({ licence: userDriver.map((item) => item.toObject({ getters: true })) || [] });
}

async function getByIdDriverLicense(req, res, next) {
  const { driverId } = req.params;
  let userDriver;

  try {
    userDriver = await DriverLicence.findById(driverId);
  } catch (err) {
    return next(new HttpError("could not get data, please try again", 500));
  }

  if (!userDriver) {
    return next(new HttpError("could not find driver licence", 404));
  }

  res.json({ licence: userDriver.toObject({ getters: true }) });
}

exports.createDriverLicense = createDriverLicense;
exports.updateDriverLicense = updateDriverLicense;
exports.deleteDriverLicense = deleteDriverLicense;
exports.getAllDriverLicense = getAllDriverLicense;
exports.getByIdDriverLicense = getByIdDriverLicense;
