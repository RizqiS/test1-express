const mongoose = require("mongoose");
const HttpError = require("../../models/HttpError");
const validator = require("express-validator");
const Member = require("../../models/schemas/movies-rental/member-schema");
const DriverLicense = require("../../models/schemas/movies-rental/drivers-schema");

async function createMember(req, res, next) {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { email, surname, firstName, address, phoneNo, nameBank, accountNo, driverId } = req.body;
  const noAccount = accountNo.split("-").join("");

  let driverLicense;
  try {
    driverLicense = await DriverLicense.findById(driverId);
  } catch (err) {
    return next(new HttpError("something went wrong, please try again", 500));
  }

  const createMember = new Member({
    email,
    surname,
    firstName,
    address,
    phoneNo: parseInt(phoneNo),
    nameBank,
    accountNo: parseInt(noAccount),
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createMember.driverId = driverLicense;
    await createMember.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("something went wrong, please try again", 500));
  }

  res.status(201).json({ createMember });
}

async function updateMember(req, res, next) {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { memberId } = req.params;

  const noAccount = req.body.accountNo.split("-").join("");
  let members;
  try {
    members = await Member.findByIdAndUpdate(
      memberId,
      { ...req.body, accountNo: parseInt(noAccount) },
      { new: true, runValidators: true }
    );
  } catch (err) {
    return next(new HttpError("something went wrong, please try again", 500));
  }

  if (!members) {
    return next(new HttpError("could not find member", 404));
  }

  res.status(201).json({ members });
}

async function deleteMember(req, res, next) {
  const { memberId } = req.params;

  let members;

  try {
    members = await Member.findById(memberId);
  } catch (err) {
    return next(new HttpError("cannot find data, please try again", 500));
  }

  if (!members) {
    return next(new HttpError("could not find data by id member", 404));
  }

  try {
    members = await Member.findByIdAndDelete({ _id: memberId });
  } catch (err) {
    return next(new HttpError("cannot delete data, please try again", 500));
  }

  res.status(201).json({ message: "delete member success" });
}

async function getAllMember(req, res, next) {
  let members;
  try {
    members = await Member.find();
  } catch (err) {
    return next(new HttpError("something went wrong, please try again", 500));
  }

  if (!members || members.length === 0) {
    return next(new HttpError("could not find member", 404));
  }

  res.json({ members: members.map((member) => member.toObject({ getters: true })) || [] });
}

async function getAllMemberLicenseDriver(req, res, next) {
  let members;
  try {
    members = await Member.find().populate("driverId");
  } catch (err) {
    console.log(members);
    return next(new HttpError("something went wrong, please try again", 500));
  }

  if (!members || members.length === 0) {
    return next(new HttpError("could not find member", 404));
  }

  return res.json({ memberWithLincenseDriver: members.map((item) => item.toObject({ getters: true })) });
}

async function getMemberById(req, res, next) {
  const { memberId } = req.params;
  let members;
  try {
    members = await Member.findById(memberId).populate("driverId");
  } catch (err) {
    return next(new HttpError("data not found, please try again", 500));
  }

  if (!members) {
    return next(new HttpError("could not find for id", 404));
  }

  res.json({ members: members.toObject({ getters: true }) });
}

async function getMemberByIdDriverLicense(req, res, next) {
  const { driverId } = req.params;
  let memberByDriverLicense;
  try {
    memberByDriverLicense = await Member.find().populate("driverId").where("driverId").equals(driverId);
  } catch (err) {
    return next(new HttpError("something went wrong, please try again", 500));
  }

  if (!memberByDriverLicense) {
    return next(new HttpError("could not find for id driver license", 404));
  }
  res.json({ memberByDriverLicense });
}

exports.createMember = createMember;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
exports.getAllMember = getAllMember;
exports.getMemberById = getMemberById;
exports.getAllMemberLicenseDriver = getAllMemberLicenseDriver;
exports.getMemberByIdDriverLicense = getMemberByIdDriverLicense;
