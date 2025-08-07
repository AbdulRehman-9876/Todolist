import { deleteItem } from "../Service/TodoListApis";
import { ReloadContext } from "./ReloadContext";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export default function DeleteButton(prop) {
  const { setShouldReload } = useContext(ReloadContext);
  const deleteTodoList = async () => {
    try {
      const deletedItem = await deleteItem(prop.id);
      console.log("Deletion Successful", deletedItem);
      setShouldReload(true);
    } catch (err) {
      console.log("Error in button", err);
    }
  };

  return (
  <>
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      style={{ marginLeft: 10 }}
      onClick={deleteTodoList}
    >
      Delete
    </Button>
  </>
);
}


