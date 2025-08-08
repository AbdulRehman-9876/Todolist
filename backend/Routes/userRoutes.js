const express = require("express");
const router = express.Router();

const {
  addUser,
  deleteUser,
  getUserDetails
} = require("../Controller/userController");

router.post("/addUser", addUser); //Add user (register)
router.delete("/deleteUser/:id", deleteUser); //Delete User from database
router.get("/getUserDetails/:id",getUserDetails)//Get user details from database

module.exports = router;
