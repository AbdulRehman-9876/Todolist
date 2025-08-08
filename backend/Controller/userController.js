const UserSchema = require("../Schema/user");

const addUser = async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const userDetails = new UserSchema({
      name: name,
      email: email,
      password: pass,
      dateCreated: Date.now(),
    });
    await userDetails.save();
    res.status(200).json(`User Siccessfully Created${userDetails}`);
  } catch (err) {
    res.status(404).json({ message: `Error in adding user: ${err}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const deletedUser = await UserSchema.findByIdAndDelete(userID, {
      new: true,
    });
    res
      .json(200)
      .message({ message: `User Deleted Successfully ${deletedUser}` });
  } catch (err) {
    res.status(404).json({ message: `Error in deleting user: ${err}` });
  }
};

const getUserName = async (req, res) => {
  try {
    const fetchUserDetails = await UserSchema.findById(userID);
    res.json(200).json({ message: "Name successfully fetched" }, fetchUserDetails.name);
  } catch (err) {res.json(404).json({message:`Error in finding user: ${err}`})}
};
