import React from "react";
import Typography from "@mui/material/Typography";
import CompletedTask from "../TodoList/CompletedTask";
import Input from "../TodoList/Input";

export default function TodoList() {
  return (
    <>
    {/* All the todolist components are called here */}
      <Typography variant="h5" mb={2} mt={5} ml={50}>
        Todo list Appliation
      </Typography>
      <Input />
      <CompletedTask />
    </>
  );
}
