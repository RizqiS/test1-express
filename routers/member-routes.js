const express = require("express");
const validation = require("../utils/validation");
const memberControllers = require("../controllers/moviesRental/member-controllers");
const router = express.Router();

router.post(
  "/",
  [
    validation.emptyCheck("surname"),
    validation.emptyCheck("firstName"),
    validation.emptyCheck("address"),
    validation.emptyCheck("phoneNo"),
    validation.emptyCheck("nameBank"),
    validation.emailCheck("email"),
    validation.emptyCheck("accountNo"),
    validation.emptyCheck("driverId"),
  ],
  memberControllers.createMember
);

router.patch(
  "/:memberId",
  [
    validation.emptyCheck("surname"),
    validation.emptyCheck("firstName"),
    validation.emptyCheck("address"),
    validation.emptyCheck("phoneNo"),
    validation.emptyCheck("nameBank"),
    validation.emailCheck("email"),
    validation.emptyCheck("accountNo"),
    validation.emptyCheck("driverId"),
  ],
  memberControllers.updateMember
);

router.delete("/:memberId", memberControllers.deleteMember);

router.get("/", memberControllers.getAllMember);

router.get("/license", memberControllers.getAllMemberLicenseDriver);

router.get("/:memberId", memberControllers.getMemberById);

router.get("/license/:driverId", memberControllers.getMemberByIdDriverLicense);

module.exports = router;
