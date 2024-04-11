const { check } = require("express-validator");

/*
 * value {string}
 * check {value} is empty
 */
function emptyCheck(value) {
  return check(value).trim().notEmpty().escape();
}

/*
 * value {string}, min {number}
 * check {value} length is more than {min}
 */
function lengthCheck(value, min) {
  return check(value).trim().not().isEmpty().isLength({ min }).escape();
}

/*
 * value {string}
 * convert {value} to number
 */
function numberCheck(value) {
  return check(value).trim().notEmpty().toInt().isInt().escape();
}

/**
 * value {string}
 * check {value} is not empty and is a email address
 */
function emailCheck(value) {
  return check(value).trim().notEmpty().isEmail().escape();
}

exports.emptyCheck = emptyCheck;
exports.lengthCheck = lengthCheck;
exports.numberCheck = numberCheck;
exports.emailCheck = emailCheck;
