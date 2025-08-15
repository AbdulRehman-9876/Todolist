import Typography from "@mui/material/Typography";
import CompletedTask from "../TodoList/CompletedTask";
import Input from "../TodoList/Input";
import LogoutButton from "../User/LogoutButton";
import DeleteUserButton from "../User/DeleteUserButton";

export default function TodoList() {
  return (
    <>
    {/* All the todolist components are called here */}
    <DeleteUserButton/>
      <LogoutButton/>
      <Typography variant="h5" mb={2} mt={5} ml={50}>
        Todo list Appliation
      </Typography>
      <Input />
      <CompletedTask />
    </>
  );
}
