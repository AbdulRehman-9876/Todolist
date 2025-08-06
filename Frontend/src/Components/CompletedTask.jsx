import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import Box from '@mui/material/Box';

import {
  getAllItems
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
        console.log("Issue in fetching data from from frontend, " +   err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     {data.length > 0 ? (
  data.map((item) => (
    <Box key={item._id} mb={2} p={2} border={1} borderRadius={3}>
      <Typography variant="h10">{item.description}</Typography>
    </Box>
  ))
) : (
  <Typography>No data in database</Typography>
)}

    </>
  );
}
