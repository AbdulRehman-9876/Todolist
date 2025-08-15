import axios from "axios";

const BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";

const createUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/addUser`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(`error in creating user ${err}`);
  }
};
const getUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/getUserDetails`);
    return response.data;
  } catch (err) {
    console.log(`error in fetching user data ${err}`);
  }
};
const deleteUser = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/deleteUser`);
    return response.data;
  } catch (err) {
    console.log(`err deleting user ${err}`);
  }
};
const checkLoginCredentials = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/checkLoginCredentials`,
      { email, password }
    );

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (err) {
    console.log(`error in checking user details`, err);
  }
};

export { createUser, getUserData, deleteUser, checkLoginCredentials };
