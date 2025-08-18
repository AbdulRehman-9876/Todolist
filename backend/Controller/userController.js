const UserSchema = require("../Schema/user");
const TodoListSchema = require("../Schema/todolist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP_Schema = require("../Schema/otp")
const sendEmail = require("../Utils/email")
const otpGenerator = require("../Utils/otpGenerator")

//Add user (register)
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hash = bcrypt.hashSync(password, 10);

    // Create user
    const userDetails = new UserSchema({
      name,
      email,
      password: hash,
      dateCreated: Date.now(),
      IsVerified: false,
    });
    await userDetails.save();

    // Generate OTP
    const generatedOTP = otpGenerator();

    // Send OTP via email
    await sendEmail(email, generatedOTP);

    // Save OTP in DB
    const otp = new OTP_Schema({
      user_id: userDetails._id,
      creationDate: Date.now(),
      expiryDate: Date.now() + (5 * 60 * 1000),
      otp_code: generatedOTP
    });
    await otp.save();

    res.status(200).json({
      message: "User created, waiting for OTP to verify user. OTP expires in 5 minutes." });

  } catch (err) {
    res.status(402).json({
      message: `Error in adding user (Maybe Email Already Exists?): ${err.message}`});
  }
};

//Delete User from database
const deleteUser = async (req, res) => {
  try {
    const id = req.user.id; 

    // 1. Delete all the user's todos
    const deletedSchemas = await TodoListSchema.deleteMany({ userId: id });

    // 2. Delete the user himself
    const deletedUser = await UserSchema.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User and their data deleted successfully",
      deletedUser,
      deletedSchemas,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error in deleting user: ${err.message}`,
    });
  }
};

//Get user details from database
const getUserDetails = async (req, res) => {
  try {
    const { id } = req.user.id;
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
      return res.status(400).json({ message: "user not found" });
    } else if (!(await bcrypt.compare(password, fetchUserDetails.password))) {
      console.log("Wrong Password");
      return res.status(400).json({ message: "wrong password" });
    } else {
      console.log("User is authenticated");
      const token = jwt.sign(
        { id: fetchUserDetails._id, email: fetchUserDetails.email }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "1h" } // token expiry
      );

      res.status(200).json({
        message: "User is authenticated",
        user: {
          id: fetchUserDetails._id,
          email: fetchUserDetails.email,
        },
        token,
      }); //works in case user provided valid email and password
    }
  } catch (err) {
    console.log(`Error while checking credentials ${err}`);
  }
};

const getIsVerified = async() => {
  try{
  const response = await UserSchema.findOne({email: _email})
  res.status(200).json(response);
  } catch(err){
    console.log(err);
  }

}


module.exports = {
  addUser,
  deleteUser,
  getUserDetails,
  checkLoginCredentials,
  getIsVerified,
};
