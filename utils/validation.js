const { check } = require("express-validator");

/*
 * value {string}
 * check {value} is empty
 */
function emptyCheck(value) {
  return check(value).trim().not().isEmpty().escape();
}

/*
 * value {string}, min {number}
 * check {value} length is more than {min}
 */
function lengthCheck(value, min) {
  return check(value).trim().not().isEmpty().isLength({ min }).escape();
}

function numberCheck(value) {
  return check(value).trim().toInt().not().isEmpty().escape();
}

exports.emptyCheck = emptyCheck;
exports.lengthCheck = lengthCheck;
exports.numberCheck = numberCheck;
