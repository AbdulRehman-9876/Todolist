import Todolist from "./Components/TodoList";
import Input from "./Components/Input";
import Container from "@mui/material/Container";
import CompletedTask from "./Components/CompletedTask";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Todolist />
        <Input />
        <CompletedTask />
      </Container>
    </>
  );
}

export default App;
