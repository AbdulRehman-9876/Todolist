import axios from "axios";


const BASE_URL = "http://localhost:3003";

const createUser = async(name, email, password) => {
    try{
        const response = await axios.post(`${BASE_URL}/user/addUser`,{name,email,password})
        return response.data;
    }catch(err){
        console.log(`error in creating user ${err}`);
    }
}
const getUserData = async(id) => {
    try{
        const response = await axios.get(`${BASE_URL}/user/getUserDetails/${id}`)
        return response.data; 
    }catch(err){
        console.log(`error in fetching user data ${err}`)
    }
}
const deleteUser = async(id) => {
    try{
        const response = await axios.delete(`${BASE_URL}/user/deleteUser/${id}`)
        return response.data;
    }catch(err){
        console.log(`errr deleting user ${err}`);
    }
}

export{
    createUser,
    getUserData,
    deleteUser
}