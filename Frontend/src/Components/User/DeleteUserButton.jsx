import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "../../Service/userApis";
import { useNavigate } from "react-router-dom";

export default function MyComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteUser();
      setOpen(false);
      //if successfully deleted then we will remove the token
      localStorage.removeItem("token"); //removes the token
      navigate("/"); //navigate back to register page
      return deleteUser;
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <>
      <Button
        onClick={handleDeleteClick}
        variant="contained"
        sx={{ ml: 107, mt: 2, mb: -8.5 }}
      >
        Delete User Account
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, you want to delete yout account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reveresed and you will lose all your data,
            including your todos. You can use this application by registering
            your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete my account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
