const express = require("express");

const authController = require("../controller/authController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/register", authController.register);
router.post("/loginwithemail", authController.loginWithEmail);
router.post("/sendotp", authController.otp);
router.post("/verify", authController.verify);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
