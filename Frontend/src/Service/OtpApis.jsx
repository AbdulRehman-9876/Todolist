import axios from "axios";

const BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL;

const verifyOtp = async (user_id) => {
    try{
        const respone = await axios.put(`${BASE_URL}/otp/verifyOTP/${user_id}`)
        return respone.data;
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    verifyOtp
}