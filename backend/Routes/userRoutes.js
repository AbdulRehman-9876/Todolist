const express = require("express");
const router = express.Router();

const {
  addUser,
  deleteUser,
  getUserDetails,
  checkLoginCredentials
} = require("../Controller/userController");

router.post("/addUser", addUser); //Add user (register)
router.delete("/deleteUser/:id", deleteUser); //Delete User from database
router.get("/getUserDetails/:id",getUserDetails)//Get user details from database
router.post("/checkLoginCredentials/",checkLoginCredentials) //function to check valid user and password

module.exports = router;
