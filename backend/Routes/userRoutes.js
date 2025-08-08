const express = require("express");
const router = express.Router();

const {
  addUser,
  deleteUser,
  getUserName,
} = require("../Controller/userController");

router.post("/addUser", addUser); //Add user (register)
router.delete("/deleteUser/:id", deleteUser); //Delete User from database
router.get("/getUsername", getUserName); //Get username from database

module.exports = router;
