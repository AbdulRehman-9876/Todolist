const OTP_Schema = require("../Schema/otp");
const UserSchema = require("../Schema/user");

const verifyOtp = async (req, res) => {
  try {
    const { email } = req.params;      
    const { otp_code } = req.body;   
    
    // 1. Find user by email
    const findUser = await UserSchema.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Email not found" });
    }
    const id = findUser._id;

    // 2. Find OTP record
    const otpRecord = await OTP_Schema.findOne({ user_id: id });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP record not found" });
    }

    // 3. Check expiry
    if (new Date(otpRecord.expiryDate) < new Date()) {
      return res.status(400).json({ message: "OTP expired, please request a new one" });
    }

    // 4. Check OTP match
    if (String(otpRecord.otp_code) !== String(otp_code)) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // 5. OTP is valid → update user
    await UserSchema.findByIdAndUpdate(
      id,
      { IsVerified: true },
      { new: true }
    );

    // 6. Delete OTP after successful verification
    await OTP_Schema.deleteOne({ user_id: id });

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res.status(500).json({ message: "Server error while verifying OTP" });
  }
};

module.exports = {
  verifyOtp,
};
