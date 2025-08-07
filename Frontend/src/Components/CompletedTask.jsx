import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { ReloadContext } from "./ReloadContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { getAllItems } from "../Service/TodoListApis";
import DoneTaskButton from "./DoneTaskButton";

export default function CompletedTask() {
  const { shouldReload, setShouldReload } = useContext(ReloadContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const FetchedData = await getAllItems();
        setData(FetchedData);
        setShouldReload(false); // reset after fetching
      } catch (err) {
        console.log("Issue in fetching data from from frontend, " + err);
      }
    };

    if (shouldReload) {
      fetchData();
    }
  }, [shouldReload]);

  const incompleteTasks = data.filter((item) => !item.isCompleted);
  const completedTasks = data.filter((item) => item.isCompleted);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Pending Tasks
      </Typography>

      {incompleteTasks.length > 0 ? (
        data.map((item) => (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={item._id}
            mb={2}
            p={1.7}
            border={1}
            borderRadius={3}
          >
            <Typography variant="h10">{item.description}</Typography>
            <div style={{ justifyContent: "end" }}>
              <DoneTaskButton id={item._id}/> {/*Done button*/}
              <EditButton id={item._id} /> {/*edit button*/}
              <DeleteButton id={item._id} isCompleted = {item.isCompleted} /> {/*delete button*/}
            </div>
          </Box>
        ))
      ) : (
        <Typography>No data in database</Typography>
      )}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Completed Tasks
      </Typography>
      {completedTasks.length > 0 ? (
        data.map((item) => (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={item._id}
            mb={2}
            p={1.7}
            border={1}
            borderRadius={3}
          >
            <Typography variant="h10">{item.description}</Typography>
            <div style={{ justifyContent: "end" }}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<CloseIcon />}
                style={{ marginRight: 10 }}
              >
                Not Done
              </Button>
              <EditButton id={item._id} /> {/*edit button*/}
              <DeleteButton id={item._id} isCompleted = {item.isCompleted} /> {/*delete button*/}
            </div>
          </Box>
        ))
      ) : (
        <Typography>No data in database</Typography>
      )}
    </>
  );
}
