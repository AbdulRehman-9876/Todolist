import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateIcon from "@mui/icons-material/Update";
import { useState } from "react";
import { ReloadContext } from "./ReloadContext";
import { useContext, useEffect} from 'react';
import {updateDescription, getSIngleItem} from "../Service/TodoListApis";

export default function EditButton(prop) {
  const [open, setOpen] = React.useState(false);
  const [labelText, setLabelText] = useState('');
  const { setShouldReload } = useContext(ReloadContext);

  const fetchDescriptionApi = async() =>{
    try{
       const fetchDesc = await getSIngleItem(prop.id);
       return fetchDesc.description;
    }catch(err){
      console.log("Errr in getting Api for description (frontend) ", err);
      return [];
    
    }
  }
   useEffect(() => {
    const fetchData = async () => {
      const description = await fetchDescriptionApi();
      setLabelText(description);
    };

    fetchData();
  }, [prop.id]); // refetch if prop.id changes

  const editDescriptionApi = async() => {
    try{
       const updatedData = await updateDescription(prop.id, labelText);
       setShouldReload(true);
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
    handleClose();
  };

    const handleChange = (event) => {
    setLabelText(event.target.value);
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
                value={labelText}
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
