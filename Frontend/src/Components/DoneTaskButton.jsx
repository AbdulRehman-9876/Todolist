import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { updateIsCompleted } from "../Service/TodoListApis";
import { ReloadContext } from "./ReloadContext";
import { useContext } from "react";
export default function DoneTaskButton(prop) {
    const { setShouldReload } = useContext(ReloadContext);
    const handleTaskAPI = async() => {
  try {
    await updateIsCompleted(prop.id);
    setShouldReload(true);
  } catch (err) {console.log("error in fetching isTaskCompleted API ", err)}
};
  return (
    <>
      <Button
        variant="outlined"
        color="success"
        startIcon={<DoneIcon />}
        style={{ marginRight: 10 }}
        onClick={handleTaskAPI}
      >
        {prop.task}
      </Button>
    </>
  );
}
