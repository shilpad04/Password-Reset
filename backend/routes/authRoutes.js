const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authRegister");
const { loginUser } = require("../controllers/authLogin");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
