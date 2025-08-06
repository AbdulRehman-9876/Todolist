import Todolist from "./Components/TodoList";
import Input from "./Components/Input";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
    <Box>

     <Container maxWidth="lg">
      <Todolist/>
        <Input />
     </Container>
    </Box>

    </>
  );
}

export default App;
