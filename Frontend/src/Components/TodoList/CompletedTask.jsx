import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { ReloadContext } from "./ReloadContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { getAllItems } from "../../Service/TodoListApis";
import DoneTaskButton from "./DoneTaskButton";
import { jwtDecode } from "jwt-decode";

export default function CompletedTask() {
  const { shouldReload, setShouldReload } = useContext(ReloadContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let user_id;
        if (token) {
          const decoded = jwtDecode(token);
          user_id = decoded.id;
        }
        const FetchedData = await getAllItems(user_id);
        setData(FetchedData);
        setShouldReload(false); // reset after fetching
      } catch (err) {
        console.log("Issue in fetching data from from frontend, " + err);
      }
      console.log("Complete Task: ", completedTasks);
      console.log("Incomplete Task: ", incompleteTasks);
    };

    if (shouldReload) {
      fetchData();
    }
  }, [shouldReload]);

  const incompleteTasks = data.filter((item) => item.isCompleted == false);
  const completedTasks = data.filter((item) => item.isCompleted == true);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Pending Tasks
      </Typography>

      {incompleteTasks.length > 0 ? (
        incompleteTasks.map((item) => (
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
              <DoneTaskButton id={item._id} task={"Done"} /> {/*Done button*/}
              <EditButton id={item._id} desc={item.description} />{" "}
              {/*edit button*/}
              <DeleteButton id={item._id} isCompleted={item.isCompleted} />{" "}
              {/*delete button*/}
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
        completedTasks.map((item) => (
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
              <DoneTaskButton id={item._id} task={"Not Done"} />{" "}
              {/*Done button*/}
              <DeleteButton id={item._id} isCompleted={item.isCompleted} />{" "}
              {/*delete button*/}
            </div>
          </Box>
        ))
      ) : (
        <Typography>No data in database</Typography>
      )}
    </>
  );
}
