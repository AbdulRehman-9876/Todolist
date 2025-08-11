import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createItem } from "../../Service/TodoListApis";
import { useState } from "react";
import { ReloadContext } from "./ReloadContext";
import { useContext } from "react";
import {jwtDecode} from "jwt-decode";

export default function Input() {
  const { setShouldReload } = useContext(ReloadContext);
  const [description, setDescription] = useState("");

  const createTodoList = async () => {
    try {
      if (description.trim().length === 0) {
        alert("Description is empty");
        return;
      }
      const token = localStorage.getItem("token");
      let user_id;
      if (token) {
        const decoded = jwtDecode(token);
         user_id = decoded.id;
      }
      await createItem(description,user_id);
      setShouldReload(true);
    } catch (err) {
      console.log(`Error in creating new record, ${err}`);
    }
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <TextField
        id="standard-basic"
        label="Enter Notes"
        variant="standard"
        fullWidth
        value={description}
        onChange={handleChange}
      />
      <Button
        onClick={createTodoList}
        variant="contained"
        color="success"
        sx={{ ml: 129, mt: 2, mb: 3, width: 120 }}
      >
        Add Notes
      </Button>
    </>
  );
}
