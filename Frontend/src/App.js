import Todolist from "./Components/TodoList";
import Input from "./Components/Input";
import Container from "@mui/material/Container";
import CompletedTask from "./Components/CompletedTask";
import { ReloadContext } from "./Components/ReloadContext";
import { useState } from "react";

function App() {
  const [shouldReload, setShouldReload] = useState(true);

  return (
    <>
        <Container maxWidth="lg">
          <ReloadContext.Provider value={{ shouldReload, setShouldReload }}>
            <Todolist />
            <Input />
            <CompletedTask />
          </ReloadContext.Provider>
        </Container>
    </>
  );
}

export default App;
