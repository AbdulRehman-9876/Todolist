import Todolist from "./Components/TodoList/TodoList";
import Container from "@mui/material/Container";
import { ReloadContext } from "./Components/TodoList/ReloadContext";
import RegisterPage from "./Components/User/RegisterPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/User/LoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import VerifyUserOTP from "./Components/User/VerifyUserOTP"
function App() {
  const [shouldReload, setShouldReload] = useState(true);

  return (
    <>
      <Container maxWidth="lg">
        <ReloadContext.Provider value={{ shouldReload, setShouldReload }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RegisterPage />}></Route>
              <Route
                path="TodoList/"
                element={
                  <ProtectedRoute>
                    <Todolist />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/verifyOtp" element={<VerifyUserOTP/>}></Route>
              <Route path="Login" element={<LoginPage />}></Route>
            </Routes>
          </BrowserRouter>
        </ReloadContext.Provider>
      </Container>
    </>
  );
}

export default App;
