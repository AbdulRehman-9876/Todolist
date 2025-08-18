const express = require("express");
const router = express.Router();
const {
  verifyOtp
} = require("../Controller/otpController")

router.get(`/verifyOTP`,verifyOtp )

module.exports = router;
