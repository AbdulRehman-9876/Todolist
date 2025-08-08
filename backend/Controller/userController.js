const UserSchema = require("../Schema/user");

//Add user (register)
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDetails = new UserSchema({
      name: name,
      email: email,
      password: password,
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
    const {id} = req.params;
    console.log(id);
    const fetchUserDetails = await UserSchema.findById(id);
    res.status(200).json(fetchUserDetails);
  } catch (err) {res.status(404).json({message:`Error in finding user: ${err}`})}
};

module.exports = {
  addUser,
  deleteUser,
  getUserDetails
}