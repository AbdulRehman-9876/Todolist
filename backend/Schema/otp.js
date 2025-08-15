const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }, userId: { // so each user can get their own specific todolist
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('otp',otpSchema); 