const OTP_Schema = require("../Schema/otp");

const verifyOtp = async (req, res) => {
  try {
    const { id } = req.params.id;
    const {otp_code} = req.body.otp_code;
    
    const response = OTP_Schema.findOne({user_id: id});
    if(!response){
        throw err;
    }

    if(response.expiryDate < Date.now()){
        //this means the token was expired
        console.log(`Token is expired, kindly generate new Token`)
        throw err;
    }

    if(response.otp_code === otp_code){
        console.log("Token is verified");
        res.status(200).json({message:"Token is succesfully verified"});
    }
    
  } catch (err) {
    console.log(`Error verifying OTP, ${err}`);
    res.status(400).json({message:"Error in verifying Token"})
  }
};

module.exports = {
    verifyOtp,
}