const UserSchema = require("../Schema/user");
const bcrypt = require("bcrypt");

//Add user (register)
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10); //create hash
    const userDetails = new UserSchema({
      name: name,
      email: email,
      password: hash, //usingh hashed password
      dateCreated: Date.now(),
    });
    await userDetails.save();
    res.status(200).json(`User Siccessfully Created${userDetails}`);
  } catch (err) {
    res.status(404).json({ message: `Error in adding user: ${err}` });
  }
};
//Delete User from database
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserSchema.findByIdAndDelete(id, {
      new: true,
    });
    res
      .json(200)
      .message({ message: `User Deleted Successfully ${deletedUser}` });
  } catch (err) {
    res.status(404).json({ message: `Error in deleting user: ${err}` });
  }
};

//Get user details from database
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchUserDetails = await UserSchema.findById(id);
    res.status(200).json(fetchUserDetails);
  } catch (err) {
    res.status(404).json({ message: `Error in finding user: ${err}` });
  }
};
//function to check valid user and password
const checkLoginCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fetchUserDetails = await UserSchema.findOne({ email });
    if (!fetchUserDetails) {
      res.status(400).json({ message: "user not found" });
    } else if (await bcrypt.compare(password, fetchUserDetails.password)) {
      console.log("User is authenticated");
      res.status(200).json({ message: "User is authenticated" }); //works in case user provided valid email and password
    } else {
      console.log("Wrong Password");
      res.status(400).json({ message: "wrong password" });
    }
  } catch (err) {
    console.log(`Error while checking credentials ${err}`);
  }
};

module.exports = {
  addUser,
  deleteUser,
  getUserDetails,
  checkLoginCredentials,
};
