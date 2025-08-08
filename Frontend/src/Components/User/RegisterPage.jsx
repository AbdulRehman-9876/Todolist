import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function RegisterPage() {
  return (
    <>
    <Container maxWidth="sm">

   
    <Typography sx={{mt:15, mb:3 ,ml:20}} variant="h5" >
      Registeration Page
    </Typography>
    <Stack spacing={4}>

        <TextField id="name_id" label="Enter Name" variant="filled"/>
        <TextField id="email_id" label="Enter Email" variant="filled" type="email" />
        <TextField id="password_id" label="Enter Password" variant="filled" />
        <TextField id="confirm_password_id" label="Confirm Password" variant="filled" />
     </Stack>
     <Button color="success" variant="contained" sx={{ml: 28, mt:3}}>
      Register
     </Button>
      </Container>
    </>
  );
}
