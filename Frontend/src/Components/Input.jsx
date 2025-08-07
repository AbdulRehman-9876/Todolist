import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {createItem} from "../Service/TodoListApis";
import { useEffect, useState } from "react";
export default function Input() {

const [onSubmit, setOnSubmit] = useState(false);
const [description, setDescription] = useState("");
  const createTodoList = async () => {
        try {
            const data = await createItem(description);
            setOnSubmit(true)
        } catch (err) {
            console.log(`Error in creating new record, ${err}`);
        }
        setOnSubmit(false)
    }

    useEffect(()=>{


    },[onSubmit])
      
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
            <Button onClick={createTodoList}
                variant="contained"
                color="success"
                sx={{ ml: 130, mt: 2, mb: 3, width: 120 }}
            >
                Add Notes
            </Button >
        </>
    );
}
