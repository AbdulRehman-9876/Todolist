const express = require("express");
const router = express.Router();
const {
  verifyOtp
} = require("../Controller/otpController")

router.put(`/verifyOTP/:email`,verifyOtp )

module.exports = router;
