import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { verifyOtp } from "../../Service/OtpApis";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
export default function VerifyUserOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // safely destructure

  const [formData, setFormData] = useState({
    otpData: "",
  });

  // Update state based on ID
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await verifyOtp(email, formData.otpData);
      navigate("/login")
    } catch (err) {
      console.log("error while handling otp", err);
    }
  };
  return (
    <>
      {" "}
      <Container maxWidth="sm">
        <Typography sx={{ mt: 15, mb: 3, ml: 27 }} variant="h5">
          Verify OTP
        </Typography>{" "}
        <Stack spacing={4}>
          <TextField
            id="otpData"
            label="Enter OTP"
            type="number"
            variant="standard"
            value={formData.otpData}
            onChange={handleChange}
          ></TextField>
        </Stack>
        <Button
          color="success"
          variant="contained"
          sx={{ ml: 28, mt: 3 }}
          onClick={handleSubmit}
        >
          Confirm
        </Button>{" "}
      </Container>
    </>
  );
}
