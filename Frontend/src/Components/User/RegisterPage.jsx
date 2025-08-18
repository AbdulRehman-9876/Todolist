import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Service/userApis";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update state based on ID
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (formData.name.length < 3) {
      alert("Name size cannot be less then 3");
      return;
    }
    if (formData.email.length < 3) {
      alert("Email size cannot be less then 3");
      return;
    }
    if (formData.password.length < 3) {
      alert("Password size cannot be less then 3");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await createUser(
        formData.name,
        formData.email,
        formData.password
      );
      navigate("/verifyOtp",{state: {email: formData.email}});
      
      return response.data;
    } catch (err) {
      console.log(`error while inserting data `, err);
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Typography sx={{ mt: 15, mb: 3, ml: 20 }} variant="h5">
          Registeration Page
        </Typography>
        <Stack spacing={4}>
          <TextField
            id="name"
            label="Enter Name"
            variant="standard"
            value={formData.name}
            onChange={handleChange}
          />
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
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Stack>
        <p>
          Click here to{" "}
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "blue" }}
          >
            login
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
