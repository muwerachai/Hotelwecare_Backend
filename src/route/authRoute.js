const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/loginwithemail", authController.loginWithEmail);

module.exports = router;
