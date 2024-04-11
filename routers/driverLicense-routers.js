const express = require("express");
const router = express.Router();
const validation = require("../utils/validation");
const driverLicenceControllers = require("../controllers/moviesRental/driverLicence-controllers");

router.post(
  "/",
  [
    validation.emptyCheck("firstName"),
    validation.emptyCheck("lastName"),
    validation.emptyCheck("address"),
    validation.emptyCheck("licenceClass"),
    validation.numberCheck("postCode"),
  ],
  driverLicenceControllers.createDriverLicense
);

router.patch(
  "/:driverId",
  [
    validation.emptyCheck("firstName"),
    validation.emptyCheck("lastName"),
    validation.emptyCheck("address"),
    validation.emptyCheck("licenceClass"),
    validation.numberCheck("postCode"),
  ],
  driverLicenceControllers.updateDriverLicense
);

router.delete("/:driverId", driverLicenceControllers.deleteDriverLicense);

router.get("/", driverLicenceControllers.getAllDriverLicense);

router.get("/:driverId", driverLicenceControllers.getByIdDriverLicense);

module.exports = router;
