import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import DoneIcon from "@mui/icons-material/Done";


import {
  getAllItems,
  // deleteItem,
  // updateDescription,
  // updateIsCompleted,
} from "../Service/TodoListApis";

export default function CompletedTask() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const FetchedData = await getAllItems();
        console.log(FetchedData);
        setData(FetchedData);
      } catch (err) {
        console.log("Issue in fetching data from from frontend, " + err);
      }
    };

    fetchData();
  }, []);

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
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<UpdateIcon />}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ marginLeft: 10 }}
              >
                Delete
              </Button>
            
            </div>
          </Box>
        ))
      ) : (
        <Typography>No data in database</Typography>
      )}
    </>
  );
}
