const otpGenerator = () => {
    const otp = Math.floor(1000*Math.random() * 9000); // 4 digit OTP
    return otp;
}

module.exports = otpGenerator;