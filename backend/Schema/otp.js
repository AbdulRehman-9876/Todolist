const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
   user_id:{
    type: String,
    required: true
   },
   creationDate:{
    type: String,
    required: true
   },
   expiryDate:{
    type: String,
    required: true
   },
   otp_code: {
    type: String,
    required: true
   }
});
module.exports = mongoose.model('otp',otpSchema); 