const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/loginwithemail", authController.loginWithEmail);
router.post("/sendotp", authController.otp);
router.post("/verify", authController.verify);

module.exports = router;
