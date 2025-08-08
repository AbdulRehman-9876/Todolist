import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography, { typographyClasses } from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update state based on ID
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async () => {};

  return (
    <>
      <Container maxWidth="sm">
        <Typography sx={{ mt: 15, mb: 3, ml: 25 }} variant="h5">
          Login Page
        </Typography>
        <Stack spacing={4}>
          <TextField
            id="email"
            label="Enter Email"
            variant="standard"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="Enter Password"
            variant="standard"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Stack>
        <p>
          Click here to{" "}
          <Link
            to="/"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Register
          </Link>
          .
        </p>
        <Button
          color="success"
          variant="contained"
          sx={{ ml: 28, mt: 3 }}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Container>
    </>
  );
}
