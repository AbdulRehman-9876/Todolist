import axios from "axios";

const BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL;

const verifyOtp = async (user_email, otp_code) => {
    try{
        const respone = await axios.put(`${BASE_URL}/otp/verifyOTP/${encodeURIComponent(user_email)}`,{otp_code})
        return respone.data;
    }catch(err){
        console.log(err)
    }
}

export {
    verifyOtp
}