const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const TodoListRoutes = require("./Routes/TodoListRoutes")
const UserRoutes = require("./Routes/userRoutes")
const OtpRoute = require("./Routes/OtpRoute")
require("dotenv").config();
app.use(cors());
app.use(express.json());

const Port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB using Mongoose!");
    app.listen(Port, () => {
      console.log(`Server started on port ${Port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/todos",TodoListRoutes);
app.use("/user",UserRoutes);
app.use("/otp",OtpRoute);