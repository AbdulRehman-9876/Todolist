import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); //removes the token
        navigate("/login"); //navigate back to login page
    }
  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={handleLogout}
        sx={{ ml: 133, mt: 2, mb:-2 }}
        
      >
        Logout
      </Button>
    </>
  );
}
