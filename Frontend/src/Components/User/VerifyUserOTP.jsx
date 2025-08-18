import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { useState } from "react";
export default function VerifyUserOTP() {
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

  const handleSubmit = () => {};
  return (
    <>
      {" "}
      <Container maxWidth="sm">
        <Typography sx={{ mt: 15, mb: 3, ml: 20 }} variant="h5">
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
