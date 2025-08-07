import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateIcon from "@mui/icons-material/Update";
import { useState } from "react";

import {updateDescription} from "../Service/TodoListApis";

export default function EditButton(prop) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");

  const editDescriptionApi = async() => {
    try{
       console.log("edit button id is: ",prop.id);
       console.log("Description", description);
        const updatedData = await updateDescription(prop.id, description);
        console.log("Description Updated Successfully", updatedData)
    } catch(err){
        console.log("Error in edit button ", err)
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

    const handleChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <React.Fragment>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<UpdateIcon />}
          onClick={handleClickOpen}
        >
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Edit your notes</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="text"
                label="Enter here"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form" onClick={editDescriptionApi} >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
