const OTP_Schema = require("../Schema/otp");
const UserSchema = require("../Schema/user");

const verifyOtp = async (req, res) => {
  try {
    const { id } = req.params;      
    const { otp_code } = req.body;    

    const otpRecord = await OTP_Schema.findOne({ user_id: id });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP record not found" });
    }

    // Check expiry
    if (new Date(otpRecord.expiryDate) < new Date()) {
      return res.status(400).json({ message: "OTP expired, please request a new one" });
    }

    // Check match
    if (otpRecord.otp_code !== otp_code) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // OTP is valid → update user
    await UserSchema.findByIdAndUpdate(
      id,
      { is_verified: true },   
      { new: true }
    );

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(`Error verifying OTP:`, err);
    return res.status(500).json({ message: "Server error while verifying OTP" });
  }
};

module.exports = {
  verifyOtp,
};