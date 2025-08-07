import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import { useContext } from "react";
import { ReloadContext } from "./ReloadContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

import {
  getAllItems,
  // deleteItem (done),
  // updateDescription (done),
  // updateIsCompleted,
} from "../Service/TodoListApis";

export default function CompletedTask() {
  const { shouldReload, setShouldReload } = useContext(ReloadContext);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const FetchedData = await getAllItems();
        console.log(FetchedData);
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

  return (
    <>
      {data.length > 0 ? (
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
                startIcon={<DoneIcon />}
                style={{ marginRight: 10 }}
              >
                Done
              </Button>

              <EditButton id={item._id} />

              <DeleteButton id={item._id} />
            </div>
          </Box>
        ))
      ) : (
        <Typography>No data in database</Typography>
      )}
    </>
  );
}
